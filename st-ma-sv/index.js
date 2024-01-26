import http from 'http'

// Third Party Packages
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import {Server} from "socket.io"; 
dotenv.config();

// Express-Routers
import authRouter from "./routes/auth.js";
import attendanceRouter from "./routes/attendance.js";
import studentRouter from './routes/student.js'
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

// Express App Initialisation
const PORT = process.env.PORT || 3000;
const app = express();
const server=http.createServer(app)
export const io=new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true
  }
})

io.on('connect',(socket)=>{
  console.log(`USer Id : ${socket.id}`);
  console.log("Some One Connected!");
})



// Data Parsing Middlwares
app.use(cors({origin:true,credentials:true}))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST API Endpoints
app.use("/auth", authRouter);
app.use("/attendance", attendanceRouter);
app.use("/student",studentRouter)

// Express Error Handler Middleware
app.use(errorHandlerMiddleware)

server.listen(PORT, () => {
  console.log(`Server Started @ PORT ${PORT}`);
})



// Connecting to MDB Atlas (cloud DB)
mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => {
    console.error(`Fatal Database Error : ${err}`);
  });
