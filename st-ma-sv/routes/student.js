import { Router } from "express";

import { getAllStudents,getOneStudent } from "../controllers/students.js";
import { protectRoute } from "../middlewares/routeProtect.js";

const router=Router()

router.get("/",getAllStudents)

router.get("/:studentId",getOneStudent)



export default router