import React from 'react';
import { PiStudentFill } from 'react-icons/pi';
import { VictoryPie } from 'victory';


function AdminMainBody({ userRole }) {

    const AdminData = [
        { x: 'Present', y: 80 },
        { x: 'Absent', y: 20 },
    ];
    const StudentData = [
        { x: 'PresentDays', y: 25 },
        { x: 'AbsentDays', y: 5 },
    ];

    return (
        <div className="main_body_wrapper">
            {userRole === 'admin' && (
                <>
                    <div className="row_wrapper">
                        <div className="card matric_div">
                            <div>
                                <p>Total Students</p>
                                <span>100</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Present Students</p>
                                <span>80</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Absent Students</p>
                                <span>20</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                    </div>
                    <div className="row_wrapper">
                        <div className="card matric_div piechart-container">
                            <VictoryPie
                                data={AdminData}
                                colorScale={['#005d99', '#dcb207']}
                                style={{
                                    labels: { fontSize: 20, fill: 'white' },
                                    data: { stroke: 'white', strokeWidth: 1 },
                                }}
                                labelRadius={190}
                                labels={({ datum }) => [
                                    datum.x,
                                    `${Math.round((datum.y / 100) * 100)}%`
                                ]}
                            />
                        </div>

                    </div>
                </>
            )}


            {userRole === 'student' && (
                <>
                    <div className="row_wrapper">
                        <div className="card matric_div">
                            <div>
                                <p>Total attendence</p>
                                <span>30</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Present Days</p>
                                <span>25</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Absent Days</p>
                                <span>5</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                    </div>
                    <div className="row_wrapper">
                        <div className="card matric_div piechart-container">
                            <VictoryPie
                                data={StudentData}
                                colorScale={['#005d99', '#dcb207']}
                                style={{
                                    labels: { fontSize: 20, fill: 'white' },
                                    data: { stroke: 'white', strokeWidth: 1 },
                                }}
                                labelRadius={190}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminMainBody;