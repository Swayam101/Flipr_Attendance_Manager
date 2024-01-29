import { Router } from "express";
import { protectRoute } from "../middlewares/routeProtect.js";
import { getMyAttendance, getMyAttendanceStats,checkAttendanceHash, getAdminAttendanceStats, getDateWiseAttendance } from "../controllers/attendance.js";

const router = Router();

router.post("/",protectRoute,checkAttendanceHash );

router.get("/admin-stats",protectRoute,getAdminAttendanceStats)
router.get("/admin-stats/:date",protectRoute,getDateWiseAttendance)

router.get("/:studentId",protectRoute,getMyAttendance)
router.get("/stats/:studentId",protectRoute,getMyAttendanceStats)

export default router;
