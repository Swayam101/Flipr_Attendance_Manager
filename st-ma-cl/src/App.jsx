import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Attendence from "./pages/Attendence";
import StudenDashboard from "./pages/StudenDashboard";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Unauthorised from "./components/Unauthorised.jsx";

import Profile from "./pages/Profile";
import Forget_password from "./pages/Forget_password";

import Attendence_Marking from "./pages/Attendence_Marking.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={<ProtectedRoute component={<Dashboard />} />}
        />
        <Route
          path="/mark_attendance"
          element={<ProtectedRoute component={<Attendence_Marking />} />}
        />
        <Route
          path="/student_approval"
          element={<ProtectedRoute component={<StudenDashboard />} />}
        />
        <Route
          path="/students"
          element={<ProtectedRoute component={<Students />} />}
        />
        <Route
          path="/attendance"
          element={<ProtectedRoute component={<Attendence />} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/forget_password"
          element={<ProtectedRoute component={<Forget_password />} />}
        />
        <Route path="*" element={<Unauthorised />} />
      </Routes>
    </Router>
  );
}
export default App;
