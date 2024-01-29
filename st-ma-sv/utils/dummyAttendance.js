import mongoose from "mongoose";
import { Schema, model } from 'mongoose';
import User from "../models/User.js";

const attendanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Absent'
  }
});

const Attendance = model("attendance", attendanceSchema);

const userIds = [
  '65b73d5f6be15f3cd6038a15',
  '65b73d5f6be15f3cd6038a16',
  '65b73d5f6be15f3cd6038a17',
  '65b73d5f6be15f3cd6038a18',
  '65b73d5f6be15f3cd6038a19',
  '65b73d5f6be15f3cd6038a1a'
];

// Generate dummy data for attendance records from the user creation date to today
const generateDummyAttendanceData = async () => {
  const dummyData = [];

  for (const userId of userIds) {
    try {
      // Replace the following line with the logic to fetch the user's creation date
      const userCreationDate = await getUserCreationDate(userId);

      const currentDate = new Date(userCreationDate);
      const endDate = new Date();

      while (currentDate <= endDate) {
        dummyData.push({
          user: userId,
          date: currentDate.toISOString(),
          status: Math.random() < 0.5 ? 'Present' : 'Absent',
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    } catch (error) {
      console.error(`Error fetching user creation date for user ${userId}:`, error);
    }
  }

  return dummyData;
};

const getUserCreationDate = async (userId) => {
  const user=await User.findOne({_id:userId})
  return new Date(user.createdAt)
};

mongoose.connect("mongodb+srv://swayamgccp:pKncTHtuSBeuBp68@cluster0.4xxl6iz.mongodb.net/")
  .then(() => {
    console.log("Connected to DB");
    insertRecords();
  })
  .catch((error) => {
    console.log(error);
  });

async function insertRecords() {
  const attendanceData = await generateDummyAttendanceData();
  await Attendance.insertMany(attendanceData);
  console.log("Data Inserted!");
  mongoose.disconnect(); // Close the MongoDB connection
}