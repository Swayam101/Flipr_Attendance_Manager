// Model Imports
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

// Utility Imports
import asyncWrapper from "../utils/asyncWrapper.js";
import {
  calculateDaysFromDate,
  convertToIST,
  hasMarkedAttendance,
} from "../utils/dataManips.js";
import Qr from "../models/Qr.js";

export const checkAttendanceHash = asyncWrapper(async (req, res, next) => {
  const { hash } = req.body;
  const { _id } = req.user;
  const date = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    });

    console.log(`Scanned Code: ${hash}`);
  const currentQrCode = await Qr.findOne({}, {}, { sort: { createdAt: -1 } });
  console.log(`Current Code Code: ${currentQrCode}`);
  if (currentQrCode?.code != hash){
    return res.status(403).json({ message: "Invalid QR Code!" });
  }
  const alreadyMarked = await hasMarkedAttendance(_id, date);
  if (alreadyMarked)
    return res
      .status(403)
      .json({ message: "Attendance Has Been Makred Already!" });

  await Attendance.create({ user:_id, date, status: "Present" });
  await User.findOneAndUpdate({ _id }, { attendanceMarked: true });
  return res.status(200).json({ message: "Attendance Marked Successfully! " });
});

export const getMyAttendance = asyncWrapper(async (req, res, next) => {
  const { studentId } = req.params;
  const attendances = await Attendance.find({ user: studentId });
  res.json({ attendances });
});

export const getMyAttendanceStats = asyncWrapper(async (req, res, next) => {
  const { studentId } = req.params;
  const presentDays = await Attendance.countDocuments({
    user: studentId,
    status: "Present",
  });
  const absentDays = await Attendance.countDocuments({
    user: studentId,
    status: "Absent",
  });
  const user = await User.findOne({ _id: studentId });
  const totalDays = calculateDaysFromDate(user.createdAt)+1;
  res.json({
    totalDays,
    presentDays,
    absentDays,
  });
});

export const getAdminAttendanceStats = asyncWrapper(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() - 6); // Start from the Monday of the previous week
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4); // Assuming a week is considered from Monday to Friday
  endOfWeek.setHours(23, 59, 59, 999);

  const result = await Attendance.aggregate([
    {
      $match: {
        date: { $gte: startOfWeek, $lte: endOfWeek },
        status: "Present",
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$date" },
        count: { $sum: 1 },
      },
    },
    {
      $addFields: {
        dayOfWeek: {
          $switch: {
            branches: [
              { case: { $eq: ["$_id", 1] }, then: "Sunday" },
              { case: { $eq: ["$_id", 2] }, then: "Monday" },
              { case: { $eq: ["$_id", 3] }, then: "Tuesday" },
              { case: { $eq: ["$_id", 4] }, then: "Wednesday" },
              { case: { $eq: ["$_id", 5] }, then: "Thursday" },
              { case: { $eq: ["$_id", 6] }, then: "Friday" },
              { case: { $eq: ["$_id", 7] }, then: "Saturday" },
            ],
            default: "Unknown", // You can adjust this default value if needed
          },
        },
      },
    },
    {
      $sort: {
        _id: 1, // Sort by day of the week (Monday to Sunday)
      },
    },
  ]);


  const totalStudents = await User.countDocuments({
    isAdmin: false,
  });
  const totalPresent = await Attendance.countDocuments({
    date: { $gte: new Date(today).toLocaleString('en-US',{
      timeZone:'Asia/Kolkata'
    }) },
    status: "Present",
  });
  const totalAbsent = await Attendance.countDocuments({
    date: { $gte: new Date(today).toLocaleString('en-US',{
      timeZone:'Asia/Kolkata'
    }) },
    status: "Absent",
  });


  res
    .status(200)
    .json({ totalAbsent, totalPresent, totalStudents, weekData: result });
});

export const getDateWiseAttendance = asyncWrapper(async (req, res, next) => {
  const { date } = req.params;
  console.log(date);
  const formattedDateWithOffset = new Date(new Date(date));
 
  const result = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(formattedDateWithOffset),
          $lte: new Date(
            new Date(formattedDateWithOffset).setDate(
              new Date(formattedDateWithOffset).getDate() + 1
            )
          ),
        },
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "user",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: "$userData",
    },
    {
      $project: {
        _id: 0,
        user: "$user",
        date: 1,
        status: 1,
        name: "$userData.name",
        roll: "$userData.roll",
      },
    },
  ]);

  const dateFormattedStudents=result.map((student)=>({
    ...student,
    date:convertToIST(date)
  }))

  res.json({ students: dateFormattedStudents });
});

export const markAbsent = async () => {
  const currentDate = new Date();
  const tenAM = new Date(currentDate);
  tenAM.setHours(10, 0, 0, 0);

  try {
    const absentStudents = await User.find({
      approved: true,
      isAdmin: false,
      createdAt: { $lt: tenAM },
    });

    if (absentStudents.length > 0) {
      const attendanceRecords = absentStudents.map((student) => ({
        user: student._id,
        date: currentDate,
        status: "Absent",
      }));
      await Attendance.insertMany(attendanceRecords);
      console.log(`${absentStudents.length} Students Marked Absent!`);
    }
  } catch (error) {
    console.error("Error updating students:", error);
  }
};
