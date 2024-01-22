import bcrypt from 'bcrypt'

// Utility Imports
import Attendance from "../models/Attendance.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import {signAccessToken} from '../utils/signToken.js'

export const addAttendance=asyncWrapper(async(req,res,next)=>{
    const studentId=req.user._id
    const attendance=await Attendance.create({
        user:studentId,
        date:(()=>Date.now())(),
        status:"Present"
    })
res.json({message:"Attendance Added Successfully!"})
})

export const getAttendanceQr=asyncWrapper(async(req,res,next)=>{
    
    const hash=await signAccessToken()
})