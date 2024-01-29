import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { IoMdCheckmarkCircleOutline ,IoMdCloseCircle} from "react-icons/io";
import axiosConfig from '../utils/axiosConfig.js'
import {toast} from 'react-toastify'


function Qr_Scanner() {
    const [result, setResult] = useState(false);
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [message, setMessage]= useState('');

    const handleScan =async  (data) => {
        if (data && !attendanceMarked) {
            console.log("Scanned data:", data);
            setResult(true);
            try {
              const response=  await axiosConfig({
                    method:'POST',
                    url:"/attendance",
                    data:{hash:data.text},
                    withCredentials:true,
                })
                console.log(response)
                setMessage(response.data.message)                
            } catch (error) {
                setMessage(error.response.data.message)
            }
            setAttendanceMarked(true); // Close the scanner after scanning
        }
    };

    const handleError = (err) => {
        setMessage(err)
        console.error(err);
    };

    const handleMarkAttendance = () => {
        // Perform actions to mark attendance here
        console.log("Attendance marked!");
        setAttendanceMarked(true);
    };

    return (
        <div className='card approval-box qrcode'>
            {!attendanceMarked && (
                <>
                    <h4 style={{ marginBottom: '15px' }}>Scan QR Code to Mark Attendance</h4>
                    <QrScanner
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                </>
            )}

            {result && attendanceMarked && (
                <div className="animated-checkmark">
                    <p>{message}</p>
                    {message==="Attendance Marked Successfully! " ?
                    <IoMdCheckmarkCircleOutline style={{ color: 'green', fontSize: '70px' }} />
                    :
                    <IoMdCloseCircle style={{ color: 'red', fontSize: '70px' }} />
                    }
                </div>
            )}
        </div>
    );
};

export default Qr_Scanner;
