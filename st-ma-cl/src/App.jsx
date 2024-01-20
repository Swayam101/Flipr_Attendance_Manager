import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Attendence from "./pages/Attendence";
import StudenDashboard from "./pages/StudenDashboard";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

function App() {
  const [isLogin, setLogin] = useState(false);

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard/>} />
          <Route path="/student_approval" element={<StudenDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendence />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
export default App;
