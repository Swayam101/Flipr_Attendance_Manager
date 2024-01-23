// Third Party Packages
import { Router } from "express";
import { body, validationResult } from "express-validator";

// Controller Functions
import { registerUser, loginUser, logoutUser, sendUpdatePasswordEmail,checkMailHash } from "../controllers/auth.js";

// Middlewares
import validationMiddleware from "../middlewares/validator.js";
import { protectRoute } from "../middlewares/routeProtect.js";

// Initialising Router
const router = Router();

router.post(
  "/",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Enter A Valid Email Address"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)
      .withMessage(
        "Password Is Weak"
      ),
    body("name")
      .notEmpty()
      .withMessage("Name Is Required!")
      .isLength({ max: 15, min: 2 })
      .withMessage("Name Should Have Atleast 2 Characters!"),
  ],
  validationMiddleware,
  registerUser
);

router.post("/login",loginUser)

router.post('/send-update-mail',sendUpdatePasswordEmail)
router.post('/check-hash',checkMailHash)

router.post("/logout",protectRoute,logoutUser)

export default router;
