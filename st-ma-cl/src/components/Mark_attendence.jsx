// MarkAttendance.jsx
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const MarkAttendance = ({ attendanceData }) => {
  const [isGenerated, setIsGenerated] = useState(false);

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
      {isGenerated && attendanceData && (
        <>
        <h4 style={{marginBottom:'15px'}}>Mark Today's Attendence</h4>
        <div>
          <QRCode value={attendanceData} />
        </div>
        <p>Scan the QR code to mark your attendence</p>
        </>
      )}
    </div>
  );
};

export default MarkAttendance;
