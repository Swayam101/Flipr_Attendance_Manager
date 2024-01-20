import React from 'react';
import { PiStudentFill } from "react-icons/pi";

function AdminMainBody() {
    return (
        <div className="main_body_wrapper">
            <div className="row_wrapper">
                <div className="card matric_div">
                    <div>
                        <p>Total Students</p>
                        <span>10</span>
                    </div>
                    <div className='card-icons'>
                    <PiStudentFill />

                    </div>
                </div>
                <div className="card matric_div">
                    <div>
                        <p>Total Students</p>
                        <span>10</span>
                    </div>
                    <div className='card-icons'>
                    <PiStudentFill />

                    </div>
                </div>
                <div className="card matric_div">
                    <div>
                        <p>Total Students</p>
                        <span>10</span>
                    </div>
                    <div className='card-icons'>
                    <PiStudentFill />

                    </div>
                </div>
                
            </div>


        </div>

    );
}

export default AdminMainBody;
