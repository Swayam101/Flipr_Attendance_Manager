import Attendance from "../models/Attendance.js";

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
  const currentDate = new Date();
  let count = 0;

  const currentDatePointer = new Date(startDate);

  while (currentDatePointer <= currentDate) {
    const currentDay = currentDatePointer.getDay();
    if (currentDay >= 1 && currentDay <= 5) {
      count++;
    }

    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return count;
}
