const mongoose=require("mongoose");

const  {Schema,model} = require('mongoose')

const attendanceSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    status:{
        type:String,
        enum:['Present','Absent'],
        default:'Absent'
    }
})

const Attendance= model("attendance",attendanceSchema)

const userIds = [
  '65b21b046c4ca51615bb62b3',
  '65b21b046c4ca51615bb62b4',
  '65b21b046c4ca51615bb62b5',
  '65b21b046c4ca51615bb62b6',
  '65b21b046c4ca51615bb62b7',
  '65b21b046c4ca51615bb62b8'
];

// Generate dummy data for attendance records from January 1, 2024, to January 10, 2024
const generateDummyAttendanceData = () => {
  const dummyData = [];

  for (const userId of userIds) {
      const currentDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-25');
    console.log(userId);
      while (currentDate <= endDate) {
        const insertedDate=currentDate.toISOString()
          dummyData.push({
              user: userId,
              date: insertedDate,
              status: Math.random() < 0.5 ? 'Present' : 'Absent',
          });

          currentDate.setDate(currentDate.getDate() + 1);
      }
  }

  return dummyData;
};

const attendanceData = generateDummyAttendanceData();

mongoose.connect("mongodb+srv://swayamgccp:pKncTHtuSBeuBp68@cluster0.4xxl6iz.mongodb.net/").then(()=>{
  console.log("Connected to DB");
  insertRecords(attendanceData);
}).catch((error)=>{
  console.log(error);
})

async function insertRecords(data){
      await Attendance.insertMany(data);
      console.log("Data Inserted!");
}