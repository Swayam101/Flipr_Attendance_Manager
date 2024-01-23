// MarkAttendance.jsx
import React, { useEffect, useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';
import axios from 'axios';
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
      setAttendanceHash(response.data.hash)
    }).catch((error)=>{
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
          <QRCodeSVG value={`https://itchy-flies-smell.loca.lt/attendance/check-hash/${attendanceHash}`} />
        </div>
        <p>Scan the QR code to mark your attendence</p>
        </>
      )}
    </div>
  );
};

export default MarkAttendance;
