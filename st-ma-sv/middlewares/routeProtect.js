// Model Imports
import User from "../models/User.js";

// Third Party Package Imports
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

// UserDefined Imports
import {io} from '../index.js'

// Controller Functions
export const protectRoute = async (req, res, next) => {
  let token;

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
    io.emit('logoutuser',{message:"Log Out User!"})
   return next(error)
  }

};
