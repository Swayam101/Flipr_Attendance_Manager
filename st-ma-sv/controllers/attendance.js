// Core Packages
import crypto from "crypto";

// Model Imports
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

// Utility Imports
import asyncWrapper from "../utils/asyncWrapper.js";
import {  hasMarkedAttendance } from "../utils/dataManips.js";
import OTP from "../models/OTP.js";


export const getAttendanceQr = asyncWrapper(async (req, res, next) => {
  const { _id } = req.user;
  const otp = crypto.randomBytes(3).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 1000);
  const checkSum = `${_id}deldel${otp}`;
  await OTP.create({
    user: _id,
    code: otp,
    expiresAt,
  });
  res.json({ hash: checkSum });
});

export const checkAttendanceHash = asyncWrapper(async (req, res, next) => {
  const { hash } = req.params;

  console.log("check Attendance triggered!");

  const [userId, decodedHash] = hash.split("deldel");
  const date = new Date();

  const otp = await OTP.findOne(
    { user: userId },
    {},
    { sort: { createdAt: -1 } }
  );
  if (!otp) return res.status(419).json({ message: "Invalid OTP" });
  if (otp.expiresAt < Date.now() || !(otp.code == decodedHash))
    return res.status(419).json({ message: "Invalid OTP" });

  const alreadyMarked = await hasMarkedAttendance(userId, new Date());
  if (alreadyMarked)
    return res
      .status(403)
      .json({ message: "Attendance Has Been Makred Already!" });

  // const currentTime=date.getHours()*60+date.getMinutes()
  // const isAllowedToAttend=currentTime >= 8 * 60 && currentTime <= 10 * 60;
  // if(!isAllowedToAttend) return res.json({message:"Time Limit To Mark Attendance Has Been Reached!"})

  await Attendance.create({ user: userId, date, status: "Present" });
  await User.findOneAndUpdate({ _id: userId }, { attendanceMarked: true });
  res.status(200).send("<h1>Attendance Marked Successfully!</h1>");
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
  const date = new Date(user.createdAt);
  res.json({
    totalDays:presentDays+absentDays,
    presentDays,
    absentDays,
  });
});

export const getMyMonthlyStats = asyncWrapper(async (req, res, next) => {
  const { date } = req.body;
  const { studentId } = req.params;
  res.json({ message: "Get Monthly Stats" });
});

export const getAdminAttendanceStats = asyncWrapper(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

const startOfWeek =  new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay() - 6); // Start from the Monday of the previous week
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 4); // Assuming a week is considered from Monday to Friday
endOfWeek.setHours(23, 59, 59, 999);

  const result=await Attendance.aggregate([
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
                      { case: { $eq: ['$_id', 1] }, then: 'Sunday' },
                      { case: { $eq: ['$_id', 2] }, then: 'Monday' },
                      { case: { $eq: ['$_id', 3] }, then: 'Tuesday' },
                      { case: { $eq: ['$_id', 4] }, then: 'Wednesday' },
                      { case: { $eq: ['$_id', 5] }, then: 'Thursday' },
                      { case: { $eq: ['$_id', 6] }, then: 'Friday' },
                      { case: { $eq: ['$_id', 7] }, then: 'Saturday' },
                  ],
                  default: 'Unknown' // You can adjust this default value if needed
              }
          }
      }
  }
    ,
    {
      $sort: {
        _id: 1, // Sort by day of the week (Monday to Sunday)
      },
    },
  ])

  console.log(result);

  const totalStudents = await User.countDocuments({
    isAdmin: false,
    approved: true,
  });
  const totalPresent = await Attendance.countDocuments({
    date: { $gte: today },
    status: "Present",
  });
  const totalAbsent = await Attendance.countDocuments({
    date: { $gte: today },
    status: "Present",
  });

  res.status(200).json({ totalAbsent, totalPresent, totalStudents,weekData:result });
});

export const getDateWiseAttendance = asyncWrapper(async (req, res, next) => {
  const { date } = req.params;
  const formattedDateWithOffset = new Date(date);

  const result = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(formattedDateWithOffset),
          $lt: new Date(
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
  res.json({ students: result });
});
