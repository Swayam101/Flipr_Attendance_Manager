// Utility Imports
import asyncWrapper from "../utils/asyncWrapper.js";

export const addAttendance=asyncWrapper(async(req,res,next)=>{
res.json({message:"Add Student Attendance Route Accessed!"})
})