import React, { useEffect, useState } from 'react';

import axiosConfig from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import QRious from 'qrious';

const MarkAttendance = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [attendanceHash, setAttendanceHash] = useState(null);

  useEffect(() => {
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
          <h4 style={{ marginBottom: '15px' }}>Generate QR Code</h4>
          <p>Click below button to generate QR code for Today's attendance</p>
          <button
            onClick={handleGenerateQRCode}
            className='profileOptionButton'
            style={{ fontSize: '14px', marginTop: '10px' }}
          >
            Generate QR code
          </button>
        </>
      )}
      {isGenerated && attendanceHash && (
        <>

          <h4 style={{ marginBottom: '15px' }}>Mark Today's Attendance</h4>
          <div>
            {/* Use QRious to generate the QR code */}
            <img src={new QRious({ value: attendanceHash, size: 200 }).toDataURL()} alt="QR Code" />
          </div>
          <p>Scan the QR code to mark your attendance</p>

        </>
      )}
    </div>
  );
};

export default MarkAttendance;
