// Third Party Packages
import bcrypt from "bcrypt";
import crypto from "crypto";

// Model Imports
import User from "../models/User.js";
import OTP from "../models/OTP.js";

// Utility Imports
import asyncWrapper from "../utils/asyncWrapper.js";
import { signAccessToken } from "../utils/signToken.js";
import sendMail from "../utils/sendMail.js";
import { incrementRollNumber } from "../utils/dataManips.js";
// import {io} from  '../index.js'

export const registerUser = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

 
  const io = req.app.get("socketio");

  const hashedPassword = await bcrypt.hash(password, 10);
  let latestRoll = 0;
  const latestUser = await User.findOne(
    { isAdmin: false },
    {},
    { sort: { createdAt: -1 } }
  );
  if (!latestUser) latestRoll = "STUMA001";
  else latestRoll = incrementRollNumber(latestUser.roll);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roll: latestRoll,
    // createdAt: new Date().toLocaleString("en-US", {
    //   timeZone: "Asia/Calcutta",
    // }),
  });

  const accessToken = await signAccessToken(user._id);
  user.password = undefined;

  const students = await User.find({ approved: false, isAdmin: false });

  io.emit("approve-student", {
    students,
  });

  res
    .cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({ message: "Sign Up Scuccessful!", user });
});

export const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User with this Email Does Not Exist");

  const isRightPassword = await bcrypt.compare(password, user.password);
  if (!isRightPassword) throw new Error("Incorrect Password!");

  const accessToken = await signAccessToken(user._id);
  user.password = undefined;

  res
    .cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({ message: "Log In Successful!", user });
});

export const loginQr = asyncWrapper(async (req, res, next) => {
  const { pin } = req.body;
  if (pin != "1234") throw new Error("Unauthorised : Access Denied");
  res.json({ message: "Qr Login Successful!" });
});

export const loginAdmin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (email != "admin@admin.com") throw new Error("Invalid Admin Credentials");
  if (password != "Qwer5^") throw new Error("Invalid Admin Credentials");

  const admin = await User.findOne({ isAdmin: true });

  const accessToken = await signAccessToken(admin._id);
  admin.password = undefined;

  res
    .cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({ message: "Admin Log In Successful!", admin });
});

export const sendUpdatePasswordEmail = asyncWrapper(async (req, res, next) => {
  const { reciever } = req.body;

  const user = await User.findOne({ email: reciever });

  if (!user) return res.status(404).json({ message: "Unregistered Email" });

  const otp = crypto.randomBytes(3).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 1000);

  await OTP.create({
    user: user._id,
    code: otp,
    expiresAt,
  });

  sendMail(
    reciever,
    "OTP for Attendance Manager Password Update!",
    `Here is the Required OTP: ${otp} \n Expires In 1 Minute(s)`
  );

  res.status(200).json({ message: "Email Sent Successfully!" });
});

export const checkMailHash = asyncWrapper(async (req, res, next) => {
  const { userOtp, newPassword, email } = req.body;
  const user = await User.findOne({ email });

  const otp = await OTP.findOne(
    { user: user._id },
    {},
    { sort: { createdAt: -1 } }
  );

  if (!otp) return res.status(419).json({ message: "Invalid OTP" });
  if (otp.expiresAt < Date.now() || (otp.code != userOtp))
    return res.status(419).json({ message: "Invalid OTP" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await user.updateOne({ password: hashedPassword });

  res.json({ message: "Password Has Been Updated!" });
});

export const logoutUser = asyncWrapper(async (req, res, next) => {
 
  res.clearCookie("token").json({ message: "Logout Successful!" });
});
