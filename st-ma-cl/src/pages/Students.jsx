import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Students = () => {
  // Sample data for students
  const [students, setStudents] = useState([
      { id: 1, name: 'John Doe', age: 20, grade: 'A' },
      { id: 2, name: 'Jane Doe', age: 22, grade: 'B' },
      { id: 3, name: 'Bob Smith', age: 21, grade: 'C' },
      { id: 4, name: 'Alice Johnson', age: 23, grade: 'A' },
      { id: 5, name: 'Charlie Brown', age: 19, grade: 'B' },
      { id: 6, name: 'David Williams', age: 24, grade: 'C' },
      { id: 7, name: 'Eva Martinez', age: 22, grade: 'B' },
      { id: 8, name: 'Frank Miller', age: 20, grade: 'A' },
      { id: 9, name: 'Grace Davis', age: 21, grade: 'B' },
      { id: 10, name: 'Henry Johnson', age: 23, grade: 'A' },
      { id: 11, name: 'Isaac Newton', age: 25, grade: 'A' },
      { id: 12, name: 'Marie Curie', age: 26, grade: 'B' },
      { id: 13, name: 'Albert Einstein', age: 27, grade: 'A' },
      { id: 14, name: 'Ada Lovelace', age: 24, grade: 'C' },
      { id: 15, name: 'Nikola Tesla', age: 28, grade: 'B' },
      { id: 16, name: 'Rosalind Franklin', age: 25, grade: 'A' },
      { id: 17, name: 'Stephen Hawking', age: 30, grade: 'C' },
      { id: 18, name: 'Grace Hopper', age: 29, grade: 'B' },
      { id: 19, name: 'Alan Turing', age: 28, grade: 'A' },
      { id: 20, name: 'Katherine Johnson', age: 26, grade: 'A' }    
    // Add more students as needed
  ]);

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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
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
