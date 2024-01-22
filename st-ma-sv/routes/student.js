import { Router } from "express";

import { getAllStudents,getOneStudent,approveStudent,getUnApprovedStudents } from "../controllers/students.js";
import { protectRoute } from "../middlewares/routeProtect.js";

const router=Router()

router.get("/",getAllStudents)

router.get("/approved",getUnApprovedStudents)

router.get("/:studentId",getOneStudent)

router.post("/approve/:studentId",approveStudent)



export default router