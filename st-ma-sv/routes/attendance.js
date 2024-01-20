import { Router } from "express" 
import { protectRoute } from "../middlewares/routeProtect.js";

const router=Router()

router.get('/',protectRoute,async (req,res,next)=>{
    res.json({message:`Get Attendance Route Accessed!`})
})

router.post('/:sessionId',()=>{})



export default router