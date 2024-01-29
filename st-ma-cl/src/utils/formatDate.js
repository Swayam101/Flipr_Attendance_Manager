function convertUTCDateToLocalDate(arg) {
    const date=new Date(arg)
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });
  
  console.log(new Date('2024-01-28T23:02:55.368+00:00').toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
  }));