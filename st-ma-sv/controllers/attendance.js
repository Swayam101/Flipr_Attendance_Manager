// Model Imports
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

// Utility Imports
import asyncWrapper from "../utils/asyncWrapper.js";
import { signAccessToken } from "../utils/signToken.js";
import { getWeekdayCount,hasMarkedAttendance } from "../utils/dataManips.js";


export const getAttendanceQr = asyncWrapper(async (req, res, next) => {
  const { _id } = req.user;
  const date = new Date();

  const checkSum = `${_id}/delimiter${date.toString()}`;
  const hash = await signAccessToken(checkSum);

  res.json({ hash, checkSum });
});

export const checkAttendanceHash = asyncWrapper(async (req, res, next) => {
  const { hash } = req.params;

  try {
    const decoded = jwt.verify(hash, process.env.JWT_SECRET);
    const [userId, decodedDate] = decoded.userId.split("/delimiter");
    const date = new Date(decodedDate);

    const alreadyMarked = await hasMarkedAttendance(userId, new Date());
    if (alreadyMarked)
      return res.json({ message: "Attendance Has Been Makred Already!" });

    // const currentTime=date.getHours()*60+date.getMinutes()
    // const isAllowedToAttend=currentTime >= 8 * 60 && currentTime <= 10 * 60;
    // if(!isAllowedToAttend) return res.json({message:"Time Limit To Mark Attendance Has Been Reached!"})

    await Attendance.create({ user: userId, date, status: "Present" });
    await User.findOneAndUpdate({ _id: userId }, { attendanceMarked: true });
    res.send("<h1>Attendance Marked Successfully!</h1>");

  } catch (error) {
    next(error);
  }
});

export const getMyAttendance = asyncWrapper(async (req, res, next) => {
  const { studentId } = req.params;
  const attendances = await Attendance.find({ user: studentId });
  res.json({ attendances });
});

export const getMyAttendanceStats = asyncWrapper(async (req, res, next) => {
  const { studentId } = req.params;
  const presentDays = await Attendance.find({
    user: studentId,
    status: "Present",
  });
  const absentDays = await Attendance.find({
    user: studentId,
    status: "Absent",
  });
  const user = await User.findOne({ _id: studentId });
  const date = new Date(user.createdAt);
  const totalDays = getWeekdayCount(date);
  res.json({
    totalDays,
    presentDays: presentDays.length,
    absentDays: absentDays.length,
  });
});


export const getMyMonthlyStats=asyncWrapper(async (req,res,next)=>{
    const {date}=req.body;
    const {studentId}=req.params

    const response=await Attendance.aggregate([
        {
          $match: {
            user: mongoose.Types.ObjectId(studentId),
            date: { $gte: new Date('2024-01-01') }, // Replace with your start date
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' },
            },
            totalAttendance: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            totalAttendance: 1,
          },
        },
      ])

      res.json(response)

})