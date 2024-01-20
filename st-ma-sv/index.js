// Third Party Packages
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();
// app password: ovcj dmax fudy asav
// Express-Routers
import authRouter from "./routes/auth.js";
import attendanceRouter from "./routes/attendance.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

// Express App Initialisation
const PORT = process.env.PORT || 3000;
const app = express();

// Data Parsing Middlwares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// REST API Endpoints
app.use("/auth", authRouter);
app.use("/attendance", attendanceRouter);


// Express Error Handler Middleware
app.use(errorHandlerMiddleware)

// Connecting to MDB Atlas (cloud DB)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Server will listen only if Database Is Intact
    app.listen(PORT, () => {
      console.log(`Server Started @ PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Fatal Database Error : ${err}`);
  });
