import Attendance from "../models/Attendance.js";
import qrcode from 'qrcode'

export function incrementRollNumber(rollNo) {
  const numericPart = rollNo.match(/\d+/);

  if (numericPart) {
    const currentCount = parseInt(numericPart[0], 10);
    const newCount = currentCount + 1;
    const paddedCount = newCount
      .toString()
      .padStart(numericPart[0].length, "0");

    return rollNo.replace(/\d+/, paddedCount);
  }

  return rollNo;
}

export const hasMarkedAttendance = async (userId, currentDate) => {
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);

  const existingAttendance = await Attendance.findOne({
    user: userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  return !!existingAttendance;
};

export function getWeekdayCount(startDate) {
  // Get the current date
  const currentDate = new Date();

  // Initialize count
  let weekdayCount = 0;

  // Set the start date
  let currentDateIterator = new Date(startDate);

  // Loop through each day from the start date until today
  while (currentDateIterator <= currentDate) {
      const dayOfWeek = currentDateIterator.getDay();

      // Check if it's a weekday (Monday to Friday)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          weekdayCount++;
      }

      // Move to the next day
      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }

  return weekdayCount;
}

export const generatedQrCode=async function generateQrCode(data) {
  const opts = { errorCorrectionLevel: 'H' }; // High error correction
  const qrCodeDataUrl = await qrcode.toDataURL(data, opts);
  return qrCodeDataUrl;
}

export const calculateDaysFromDate=(givenDate)=> {
  
  const parsedGivenDate = new Date(givenDate);
 
  const currentDate = new Date();
  
  const timeDifference = currentDate - parsedGivenDate;
 
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export const convertToIST = (utcDateString) => {
  const options = { timeZone: 'Asia/Kolkata' }; // Indian Standard Time (IST)
  return new Date(utcDateString).toLocaleString('en-US', options);
};