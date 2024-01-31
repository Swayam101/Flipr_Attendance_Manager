import React, { useEffect, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { IoMdCheckmarkCircleOutline ,IoMdCloseCircle} from "react-icons/io";
import axiosConfig from '../utils/axiosConfig.js'

function Qr_Scanner() {
    const [result, setResult] = useState(false);
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [message, setMessage]= useState('');
    const [qrData,setQrData]=useState(null)

    const handleScan =async  (data) => {
        if (data && !attendanceMarked) {
            console.log("Scanned data:", data);
            setQrData(data)
            setResult(true);
        }
    };

    const handleError = (err) => {
        setMessage(err)
        console.error(err);
    };
    
    useEffect(() => {
        if (qrData) {
            try {
                axiosConfig({
                    method: 'POST',
                    url: "/attendance",
                    data: { hash: qrData.text },
                    withCredentials: true,
                }).then((response) => {
                    console.log(response);
                    setMessage(response.data.message);
                    setAttendanceMarked(true);
                }).catch((error) => {
                    setMessage(error.response.data.message);
                });
            } catch (error) {
                setMessage(error.message);
            }
        }
    }, [qrData]);
    
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