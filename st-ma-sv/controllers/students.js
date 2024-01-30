import User from "../models/User.js";

import asyncWrapper from "../utils/asyncWrapper.js";
import sendMail from "../utils/sendMail.js";

export const getAllStudents = asyncWrapper(async (req, res, next) => {
  const students = await User.find(
    { isAdmin: false },
    {},
    { sort: { roll: 1 } }
  );

  res.json({ students });
});

export const getOneStudent = asyncWrapper(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await User.findOne({ studentId });
  res.json({ student });
});

export const getUnApprovedStudents = asyncWrapper(async (req, res, next) => {
  const students = await User.find({ approved: false, isAdmin: false });
  res.json({ students });
});

export const approveStudent = asyncWrapper(async (req, res, next) => {
  const { studentId } = req.params;
  const io=req.app.get('socketio')

  const student = await User.findOneAndUpdate(
    { _id: studentId },
    { approved: true },
    { new: true }
  );
  student.password=undefined
  sendMail(student.email,"Attendance Manager Notification","Your Attendance Manager Account Has Been Approved! , Kindly Login To Continue!")
  io.emit("approved", {
    student,
  });

  res.json({ student });
});

export const updateUserProfile = asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const {_id,...updatedData}=req.body
  const updatedUser = await User.findOneAndUpdate({ _id:userId }, updatedData, {
    new: true,
  });
  res.json({ updatedUser });
});
