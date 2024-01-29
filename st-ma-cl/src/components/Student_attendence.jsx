import React, { useEffect, useState } from 'react';
import axiosConfig from '../utils/axiosConfig';

const Student_attendence = () => {
    
const [selectedDate,setSelectedDate]=useState()
    const [attendanceRecords, setAttendanceRecords] = useState([{name:""}]);


    const [searchTerm, setSearchTerm] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8; // Adjust as needed

    // Filter records based on search term and selected date
    const filteredRecords = attendanceRecords.filter((record) =>record.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Pagination logic
    const totalPageCount = Math.ceil(filteredRecords.length / recordsPerPage);
    const maxVisiblePages = 5;

    const generatePageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPageCount, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page
    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        axiosConfig({
            url:`/attendance/admin-stats/${selectedDate}`,
            method:"GET",
            withCredentials:true
        }).then((response)=>{
            setAttendanceRecords(response.data.students)
            console.log(response.data);
        })
        
    }, [selectedDate])
    return (
        selectedDate ? (
            <div className="container card student-table" >

                <div className="row search-bar">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search for students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input
                                type="date"
                                className="form-control search-input"
                                onChange={async (e) =>{
                                    setSelectedDate(e.target.value)
                                   
                                }}
                            />

                        </div>
                    </div>
                </div>

                <div className="row std-table">
                    <div className="col">
                        <table className="table table-striped table-bordered table-hover">
                            <thead className='table-head'>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((record) => (
                                    <tr key={record._id}>
                                        <td>{record.roll}</td>
                                        <td>{record.name}</td>
                                        <td>{new Date(record.date).toDateString()}</td>
                                        <td>{record.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row pagination-row">
                    <div className="col">
                        <nav>
                            <ul className="pagination justify-content-end">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link prev-nxt-btn" onClick={() => handlePaginationClick(currentPage - 1)}>&laquo;</button>
                                </li>

                                {generatePageNumbers().map((pageNumber) => (
                                    <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                                        <button className="page-link page-numbers" onClick={() => handlePaginationClick(pageNumber)}>{pageNumber}</button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPageCount ? 'disabled' : ''}`}>
                                    <button className="page-link prev-nxt-btn" onClick={() => handlePaginationClick(currentPage + 1)}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div >
        ) : (
            <div className="card approval-box">
                <h4>Attendance Management</h4>
                <div>
                    <h4>Select a Date</h4>
                    {/* You can replace this with your date selection component (e.g., calendar) */}
                    <input
                        type="date"
                        onChange={(e) =>{
                            setSelectedDate(e.target.value);

                        }}
                        className="form-control search-input"
                    />
                </div>
            </div>
        )
    )
};

export default Student_attendence;
