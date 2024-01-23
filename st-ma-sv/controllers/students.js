import User from "../models/User.js";

import asyncWrapper from "../utils/asyncWrapper.js";

export const getAllStudents = asyncWrapper(async (req, res, next) => {
  const students = await User.find(
    { isAdmin: false },
    {},
    { sort: { roll: -1 } }
  );
  console.log(students);
  res.json({students})
});

export const getOneStudent=asyncWrapper(async (req, res, next) => {
    const {studentId}=req.params
    const student=await User.findOne({studentId})
    res.json({student})
});

export const getUnApprovedStudents=asyncWrapper(async (req, res, next) => {
  const students=await User.find({approved:false,isAdmin:false})
  res.json({students})
});

export const approveStudent=asyncWrapper(async (req, res, next) => {
  const {studentId}=req.params
  console.log(studentId);
  const student=await User.findOneAndUpdate({_id:studentId},{approved:true})
  res.json({student})
});


export const updateUserProfile=asyncWrapper(async (req, res, next) => {
  const {_id}=req.user
  const {phone,dateOfBirth,country,address}=req.body

  const updatedUser=await User.findOneAndUpdate({_id},{phone,DOB:dateOfBirth,country,address})

  res.json({updatedUser})

});


