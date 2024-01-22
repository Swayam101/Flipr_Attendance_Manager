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

