import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import axiosConfig from '../utils/axiosConfig';

const Students = () => {
  const [students, setStudents] = useState([]);
  useEffect(()=>{
    axiosConfig({
      url:"/student",
      method:"GET",
      withCredentials:true,
    }).then((response)=>{
      setStudents(response.data.students)
    })
  },[])

  

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8; // Adjust as needed

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  // Pagination logic
  const totalPageCount = Math.ceil(filteredStudents.length / studentsPerPage);
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
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="container card student-table">
        <div className="row search-bar">
          <div className="col-md-4 offset-md-8">
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
        </div>

        <div className="row std-table">
          <div className="col">
            <table className="table table-striped table-bordered table-hover">
              <thead className='table-head'>
                <tr>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.roll}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
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
      </div>
    </>
  );
};

export default Students;
