import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Model Imports
import User from "../models/User.js";

// Utility Imports
import asyncWrapper from "../utils/asyncWrapper.js";
import { signAccessToken } from "../utils/signToken.js";
import sendMail from "../utils/sendMail.js";
import OTP from "../models/OTP.js";

export const registerUser = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: true,
  });

  res.json({ message: "Sign Up Scuccessful!", user });
});

export const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User with this Email Does Not Exist");

  const isRightPassword = await bcrypt.compare(password, user.password);
  if (!isRightPassword) throw new Error("Incorrect Password!");

  const accessToken = await signAccessToken(user._id);
  user.password = undefined;

  res.cookie("token", accessToken, { httpOnly: true });
  res.json({ message: "Log In Successful!", user });
});

export const sendUpdatePasswordEmail = asyncWrapper(async (req, res, next) => {
  const otp = crypto.randomBytes(3).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 1000);
  const reciever=req.user.email
  await OTP.create({
    user: req.user._id,
    code: otp,
    expiresAt,
  });
  sendMail(reciever,"OTP For password Reset",`Here is Your OTP:  ${otp} <br> Expires in 30 seconds!`);
  res.status(200).json({ message: "Email Sent Successfully!"});
});

export const checkMailHash = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const { userOtp, newPassword } = req.body;

  const otp = await OTP.findOne({ user }, {}, { sort: { createdAt: -1 } });

  if (!otp) return res.status(419).json({ message: "Invalid OTP" });
  if (otp.expiresAt < Date.now() || !otp.code == userOtp)
    return res.status(419).json({ message: "Invalid OTP" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const newUser = await User.findOneAndUpdate(
    { _id: user },
    { password: hashedPassword }
  );
  res.clearCookie
  res.clearCookie("token").json({ message: "Password Has Been Updated!", user:newUser });
});

export const logoutUser = asyncWrapper(async (req, res, next) => {
  res.clearCookie("token").json({ message: "Logout Successful!" });
});
