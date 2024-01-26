import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiStudentFill } from 'react-icons/pi';
import { VictoryPie, VictoryChart, VictoryLine, VictoryAxis } from 'victory';
import axiosConfig from '../utils/axiosConfig';
import useAuthStore from '../contexts/AuthStore';


function AdminMainBody({ userRole }) {

    const [stats,setStats]=useState({totalDays:0,presentDays:0,absentDays:0})
    const [adminStats,setAdminStats]=useState({totalStudents:0,totalPresent:0,totalAbsent:0,weekData:[]})
    const userData=useAuthStore((state)=>state.userData)

    useEffect(()=>{
       
        if(userData.isAdmin){
            axiosConfig({
                url:`/attendance/admin-stats`,
                method:"GET",
                withCredentials:true
            }).then((response)=>{
                setAdminStats(response.data)
                console.log(response.data.weekData);
            }).catch(error=>{
               console.log(error);
            })
            
        }
        else {
            axiosConfig({
                url:`/attendance/stats/${userData._id}`,
                method:"GET",
                withCredentials:true
            }).then((response)=>{
                setStats(response.data)
            }).catch(error=>{
                console.log(error);
            })
        }
    },[])


    const AdminData = [
        { x: 'Present', y: adminStats.totalPresent },
        { x: 'Absent', y: adminStats.totalAbsent },
    ];
    const StudentData = [
        { x: 'PresentDays', y: stats.presentDays },
        { x: 'AbsentDays', y: stats.absentDays },
    ];

    const AdminLineChartData = adminStats.weekData.map(({ dayOfWeek, count }) => ({
        day: dayOfWeek,
        presentStudents: count
    }));
    return (
        <div className="main_body_wrapper">
            {userRole === 'admin' && (
                <>
                    <div className="row_wrapper">
                        <div className="card matric_div">
                            <div>
                                <p>Total Students</p>
                                <span>{adminStats.totalStudents}</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Present Students</p>
                                <span>{adminStats.totalPresent}</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Absent Students</p>
                                <span>{adminStats.totalAbsent}</span>
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
                        <div className="card matric_div linechart-container">
                            <VictoryChart domainPadding={20} >
                                <VictoryLine
                                    data={AdminLineChartData}
                                    x="day"
                                    y="presentStudents"
                                    style={{
                                        data: { stroke: 'rgb(220, 178, 7)' },
                                    }}
                                />
                                <VictoryAxis
                                    tickValues={AdminLineChartData.map(data => data.day)}
                                    style={{
                                        axis: { stroke: 'white' },
                                        tickLabels: { fill: 'white' },
                                    }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    tickFormat={(tick) => `${tick}`}
                                    style={{
                                        axis: { stroke: 'white' },
                                        tickLabels: { fill: 'white' },
                                    }}
                                />
                            </VictoryChart>
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
                                <span>{stats.totalDays}</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Present Days</p>
                                <span>{stats.presentDays}</span>
                            </div>
                            <div className='card-icons'>
                                <PiStudentFill />
                            </div>
                        </div>
                        <div className="card matric_div">
                            <div>
                                <p>Absent Days</p>
                                <span>{stats.absentDays}</span>
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