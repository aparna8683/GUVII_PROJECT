import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import LandingPage from "./Pages/LandingPage";
import DashBoard from "./Pages/Home/DashBoard";
import InterviewPrep from "./Pages/InterviewPrep/interviewPrep";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route
            path="/interview-prep/:sessionId"
            element={<InterviewPrep />}
          />
        </Routes>

        {/* Toaster for notifications */}
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </Router>
    </UserProvider>
  );
};

export default App;
