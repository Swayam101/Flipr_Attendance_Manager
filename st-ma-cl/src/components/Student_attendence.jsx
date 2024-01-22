import React, { useEffect, useState } from 'react';

const Student_attendence = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const [attendanceRecords, setAttendanceRecords] = useState([
        { id: 1, studentName: 'John Doe', date: '2024-01-20', status: 'Present', age: 20, grade: 'A' },
        { id: 2, studentName: 'Jane Doe', date: '2024-01-20', status: 'Absent', age: 22, grade: 'B' },
        { id: 3, studentName: 'Bob Smith', date: '2024-01-18', status: 'Present', age: 21, grade: 'C' },
        { id: 4, studentName: 'Alice Johnson', date: '2024-01-20', status: 'Absent', age: 23, grade: 'A' },
        { id: 5, studentName: 'Charlie Brown', date: '2024-01-20', status: 'Present', age: 19, grade: 'B' },
        { id: 6, studentName: 'David Williams', date: '2024-01-20', status: 'Absent', age: 24, grade: 'C' },
        { id: 7, studentName: 'Eva Martinez', date: '2024-01-20', status: 'Present', age: 22, grade: 'B' },
        { id: 8, studentName: 'Frank Miller', date: '2024-01-19', status: 'Absent', age: 20, grade: 'A' },
        { id: 9, studentName: 'Grace Davis', date: '2024-01-20', status: 'Present', age: 21, grade: 'B' },
        { id: 10, studentName: 'Henry Johnson', date: '2024-01-20', status: 'Absent', age: 23, grade: 'A' },
        { id: 11, studentName: 'Isaac Newton', date: '2024-01-21', status: 'Present', age: 25, grade: 'A' },
        { id: 12, studentName: 'Marie Curie', date: '2024-01-21', status: 'Absent', age: 26, grade: 'B' },
        { id: 13, studentName: 'Albert Einstein', date: '2024-01-21', status: 'Present', age: 27, grade: 'A' },
        { id: 14, studentName: 'Ada Lovelace', date: '2024-01-21', status: 'Absent', age: 24, grade: 'C' },
        { id: 15, studentName: 'Nikola Tesla', date: '2024-01-17', status: 'Present', age: 28, grade: 'B' },
        { id: 16, studentName: 'Rosalind Franklin', date: '2024-01-21', status: 'Absent', age: 25, grade: 'A' },
        { id: 17, studentName: 'Stephen Hawking', date: '2024-01-21', status: 'Present', age: 30, grade: 'C' },
        { id: 18, studentName: 'Grace Hopper', date: '2024-01-21', status: 'Absent', age: 29, grade: 'B' },
        { id: 19, studentName: 'Alan Turing', date: '2024-01-16', status: 'Present', age: 28, grade: 'A' },
        { id: 20, studentName: 'Katherine Johnson', date: '2024-01-21', status: 'Absent', age: 26, grade: 'A' },
        { id: 21, studentName: 'John Smith', date: '2024-01-22', status: 'Present', age: 22, grade: 'C' },
        { id: 22, studentName: 'Emily White', date: '2024-01-22', status: 'Absent', age: 23, grade: 'A' },
        { id: 23, studentName: 'Daniel Black', date: '2024-01-22', status: 'Present', age: 21, grade: 'B' },
        { id: 24, studentName: 'Olivia Green', date: '2024-01-22', status: 'Absent', age: 20, grade: 'A' },
        { id: 25, studentName: 'Liam Brown', date: '2024-01-22', status: 'Present', age: 22, grade: 'B' },
        { id: 26, studentName: 'Ava Johnson', date: '2024-01-22', status: 'Absent', age: 24, grade: 'C' },
        { id: 27, studentName: 'Noah Martinez', date: '2024-01-22', status: 'Present', age: 21, grade: 'B' },
        { id: 28, studentName: 'Sophia Miller', date: '2024-01-22', status: 'Absent', age: 19, grade: 'A' },
        { id: 29, studentName: 'Ethan Davis', date: '2024-01-22', status: 'Present', age: 20, grade: 'B' },
        { id: 30, studentName: 'Avery Taylor', date: '2024-01-22', status: 'Absent', age: 23, grade: 'A' },
        // Add more attendance records as needed
    ]);


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const [searchTerm, setSearchTerm] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8; // Adjust as needed

    // Filter records based on search term and selected date
    const filteredRecords = attendanceRecords.filter((record) =>
        record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDate ? record.date === selectedDate : true)
    );

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
                                onChange={(e) => handleDateChange(e.target.value)}
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
                                    <tr key={record.id}>
                                        <td>{record.id}</td>
                                        <td>{record.studentName}</td>
                                        <td>{record.date}</td>
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
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="form-control search-input"
                    />
                </div>
            </div>
        )
    )
};

export default Student_attendence;
