// MarkAttendance.jsx
import React, { useEffect, useState } from 'react';
// import 
import axiosConfig from '../utils/axiosConfig';
import { toast } from 'react-toastify';


const MarkAttendance = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [attendanceHash,setAttendanceHash]=useState(null)


  useEffect(()=>{
    axiosConfig({
      url:'/attendance/get-hash',
      method:"GET",
      withCredentials:true,
    }).then((response)=>{
      console.log(response.data.hash);
      setAttendanceHash(response.data.hash)
     
    }).catch((error)=>{
      console.log(error);
      toast.success("Some Error Occured!")
    })

  },[])


  const handleGenerateQRCode = () => {
    setIsGenerated(true);

  };

  return (
    <div className='card approval-box qrcode'>
      {!isGenerated && (
        <>
        <h4 style={{marginBottom:'15px'}}>Generate QR Code</h4>
        <p>Click below button to generate QR code for Today's attendence</p>
        <button  onClick={handleGenerateQRCode} className='profileOptionButton' style={{fontSize:'14px', marginTop:'10px'}}>
         Generate QR code
        </button>
        </>
      )}
      {isGenerated && attendanceHash && (
        <>
        <h4 style={{marginBottom:'15px'}}>Mark Today's Attendence</h4>
        <div>
          {/* <QRCode value={`https://h6z4bb1m-3000.inc1.devtunnels.ms/attendance/check-hash/${attendanceHash}`} level='H' size={300}/> */}
          {/* <QRCode value={`something`} size={200} /> */}

          <img src="" alt="" />
        </div>
        <p>Scan the QR code to mark your attendence</p>
        </>
      )}
    </div>
  );
};

export default MarkAttendance;
