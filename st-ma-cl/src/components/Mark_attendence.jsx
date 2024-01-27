import React, { useEffect, useState } from 'react';

import QRious from 'qrious';
import useSocketStore from '../contexts/SocketStore';
import useAuthStore from '../contexts/AuthStore';

const MarkAttendance = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [attendanceHash, setAttendanceHash] = useState("");
  const socket=useSocketStore((state)=>state.socket)
  const userData=useAuthStore((state)=>state.userData)

  useEffect(() => {
      socket.on('hashUpdate', (data) => {
        
      setAttendanceHash(data.qrCodeHash)
      setIsGenerated(true);
      // console.log(`https://h6z4bb1m-3000.inc1.devtunnels.ms/attendance/check-hash/${userData._id}/${attendanceHash}`);
    });
    
    return ()=>{
      socket.off('hashUpdate')
    }
    

  },[])




  return (
    <div className='card approval-box qrcode'>
      {!isGenerated && (
       <div className="loading_container">
       <div className="lds_ripple">
           <div></div>
           <div></div>
       </div>
       <p>Please wait while QR is being generated....</p>
   </div>
      )}
      {isGenerated && attendanceHash && (
        <>

          <h4 style={{ marginBottom: '15px' }}>Mark Today's Attendance</h4>
          <div>
            {/* Use QRious to generate the QR code */}
            <img src={new QRious({ value: `https://attendance-backend-iovb.onrender.com/attendance/check-hash/${userData._id}/${attendanceHash}`, size: 200 }).toDataURL()} alt="QR Code" />
          </div>
          <p>Scan the QR code to mark your attendance</p>

        </>
      )}
    </div>
  );
};

export default MarkAttendance;
