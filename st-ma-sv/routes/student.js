import { Router } from "express";

import { getAllStudents,getOneStudent,approveStudent,getUnApprovedStudents,updateUserProfile } from "../controllers/students.js";
import { protectRoute } from "../middlewares/routeProtect.js";

const router=Router()

router.get("/",getAllStudents)

router.get("/approved",getUnApprovedStudents)

router.get("/:studentId",getOneStudent)

router.post("/update-profile",protectRoute,updateUserProfile)

router.post("/approve/:studentId",approveStudent)



export default router