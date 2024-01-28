// Core Modules
import http from 'http'
import crypto from 'crypto'
import path from 'path';

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
import Qr from './models/Qr.js';
import { markAbsent } from './controllers/attendance.js';
import { generatedQrCode } from './utils/dataManips.js';
import { fileURLToPath } from 'url';

// Express App Initialisation
const PORT = process.env.PORT || 3000;
const app = express();
const server=http.createServer(app)

// Web socket initialisation
const io=new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true
  }
})

// Detecting socket Connection!
io.on('connection',(socket)=>{

    socket.on('unapproved',()=>{
      socket.join('unapproved')
    })

})

// Cron Job To Mark Students Absent After 10 AM
cron.schedule('0 10 * * *', markAbsent);

// Cron Job To Refresh current hash every 10 seconds
cron.schedule('*/10 * * * * *',async () => {
  const newHashCode = crypto.randomBytes(6).toString('hex');
  await Qr.deleteMany({});
  const qrCode=await Qr.create({
    code:newHashCode
  })
  const qrImageUrl=await generatedQrCode(qrCode.code)
  console.log(qrCode.code);
  io.emit('hashUpdate',{qrImageUrl});

});

const __dirname=path.dirname(fileURLToPath(import.meta.url))

app.set('socketio',io)
app.set('views',path.join(__dirname,'public'))
app.set('view engine','ejs')


// Data Parsing Middlwares
app.use(express.static("public"))
app.use(cors({origin:true,credentials:true}))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serving The Qr Page!
app.get('/',(req,res,next)=>{
  res.render('qr',)
})

// REST API Endpoints
app.use("/auth", authRouter);
app.use("/attendance", attendanceRouter);
app.use("/student",studentRouter)


// Express Error Handler Middleware
app.use(errorHandlerMiddleware)

// Express App Listens @
server.listen(PORT, () => {
  console.log(`Server Started @ PORT ${PORT}`);
})

// Connecting to MDB Atlas (cloud DB)
mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => {
    console.error(`Fatal Database Error : ${err}`);
  });
