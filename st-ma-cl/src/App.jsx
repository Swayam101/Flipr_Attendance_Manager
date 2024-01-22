import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Attendence from "./pages/Attendence";
import StudenDashboard from "./pages/StudenDashboard";
import Profile from "./pages/Profile";
import Forget_password from "./pages/Forget_password";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import StudentRoute from "./components/StudentRoute.jsx";
import AdminRoute from  './components/AdminRoute.jsx'
import Unauthorised from "./components/Unauthorised.jsx";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<AdminRoute component={<Dashboard />} />}
          />
          <Route
            path="/student_approval"
            element={<StudentRoute component={<StudenDashboard />} />}
          />
          <Route
            path="/students"
            element={<StudentRoute component={<Students />} />}
          />
          <Route
            path="/attendance"
            element={<StudentRoute component={<Attendence />} />}
          />
          <Route
            path="/profile/:username"
            element={<StudentRoute component={<Profile />} />}
          />
          <Route
            path="/forget_password"
            element={<StudentRoute component={<Forget_password />} />}
          />
          <Route path="*" element={<Unauthorised/>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
export default App;
