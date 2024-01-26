import http from 'http'
import crypto from 'crypto'
import {fileURLToPath} from 'url'
// Third Party Packages
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import cron from 'node-cron'
import {Server} from "socket.io"; 
dotenv.config();

// Express-Routers
import authRouter from "./routes/auth.js";
import attendanceRouter from "./routes/attendance.js";
import studentRouter from './routes/student.js'
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import User from './models/User.js';
import Qr from './models/Qr.js';
import path from 'path';
import asyncWrapper from './utils/asyncWrapper.js';
import { render } from 'ejs';
import { generatedQrCode } from './utils/dataManips.js';

// Express App Initialisation
const PORT = process.env.PORT || 3000;
const app = express();
const server=http.createServer(app)


export const io=new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true
  }
})

io.on('connect',(socket)=>{
    console.log(`Socket ID : ${socket.id}`);
    io.emit('get-user-data',{message:"You Need to give it to me!"})
})

io.on('user-socket-id',(data)=>{
  console.log(data.email)
  User.findOneAndUpdate({email:data.email},{socketId:data.socketId})
})

cron.schedule('*/10 * * * * *',async () => {
  const newHashCode = crypto.randomBytes(16).toString('hex');
  const qrCode=await Qr.create({
    code:newHashCode
  })
  const qrCodeDataUrl=await generatedQrCode(qrCode.code)
  io.emit('hashUpdate',{qrCodeDataUrl});
  console.log('New Hash Code:', newHashCode);
});

const __dirname=path.dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'public'))
app.set('view engine','ejs')
// Data Parsing Middlwares
app.use(cors({origin:true,credentials:true}))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST API Endpoints


app.use("/auth", authRouter);
app.use("/attendance", attendanceRouter);
app.use("/student",studentRouter)

app.get('/',asyncWrapper((async (req,res,next)=>{
  const QrDoc=await Qr.findOne({},{},{sort:{createdAt:-1}});
  const qrCodeDataUrl=await generatedQrCode(QrDoc.code)
  console.log(QrDoc.code);
  res.render('qr',{
    title:"The Attendance QR",
    qrCodeDataUrl
  })
})))

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
