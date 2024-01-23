import { Router } from "express" 
import { protectRoute } from "../middlewares/routeProtect.js";
import { getAttendanceQr } from "../controllers/attendance.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import jwt from 'jsonwebtoken'
import Attendance from "../models/Attendance.js";
const router=Router()


router.get('/get-hash',protectRoute,getAttendanceQr)

router.get('/check-hash/:hash',async (req,res,next)=>{
    console.log("route accessed!");
    const {hash}=req.params

    try {
        const decoded=jwt.verify(hash,process.env.JWT_SECRET)
        const userId=decoded.userId.split("/delimiter")[0]
        const date=new Date(decoded.userId.split("/delimiter")[1])
        const attendance=await Attendance.create({user:userId,date,status:"Present"})
        console.log(attendance);
        res.send("<h1>Attendance Marked Successfully!</h1>")
    } catch (error) {
        next(error)
    }
})


router.post('/:sessionId',()=>{})



export default router