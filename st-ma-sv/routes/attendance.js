import { Router } from "express";
import { protectRoute } from "../middlewares/routeProtect.js";
import { getAttendanceQr,getMyAttendance, getMyAttendanceStats,checkAttendanceHash,getMyMonthlyStats } from "../controllers/attendance.js";


const router = Router();


router.get("/get-hash", protectRoute, getAttendanceQr);

router.get("/check-hash/:hash",checkAttendanceHash );

router.get("/:studentId",protectRoute,getMyAttendance)

router.get("/stats/:studentId",protectRoute,getMyAttendanceStats)

router.get("stats/monthly/:studenId",protectRoute,getMyMonthlyStats)

export default router;
