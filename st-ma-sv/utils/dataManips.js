export function incrementRollNumber(rollNo) {
    // Extract the numeric part
    const numericPart = rollNo.match(/\d+/);
  
    // Check if there is a numeric part
    if (numericPart) {
      const currentCount = parseInt(numericPart[0], 10);
      const newCount = currentCount + 1;
      const paddedCount = newCount.toString().padStart(numericPart[0].length, '0');
  
      // Concatenate the prefix and incremented numeric part
      return rollNo.replace(/\d+/, paddedCount);
    }
  
    // If there is no numeric part, return the original string
    return rollNo;
  }
