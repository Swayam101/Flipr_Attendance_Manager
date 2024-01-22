// Model Imports
import User from "../models/User.js";

// Third Party Package Imports
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

// Controller Functions
export const protectRoute = async (req, res, next) => {
  let token;
  console.log(req.headers.cookie);
  try {
    if (req.cookies.token) {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select([
        "_id",
        "name",
        "email",
        "approved",
      ]);
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401);
    next(error);
  }
  if (!token) next(new Error("This Feature requires Login To Continue!"));
};
