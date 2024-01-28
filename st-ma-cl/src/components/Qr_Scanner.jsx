import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


function Qr_Scanner() {
    const [result, setResult] = useState(false);
    const [attendanceMarked, setAttendanceMarked] = useState(false);

    const handleScan = (data) => {
        if (data && !attendanceMarked) {
            console.log("Scanned data:", data);
            setResult(true);
            // Here you can send the scanned data to your backend for processing
            // Example: sendScannedData(data);
            setAttendanceMarked(true); // Close the scanner after scanning
        }
    };

    const handleError = (err) => {
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
                    <p>Attendance marked successfully!</p>
                    <IoMdCheckmarkCircleOutline style={{ color: 'green', fontSize: '70px' }} />
                </div>
            )}
        </div>
    );
};

export default Qr_Scanner;
