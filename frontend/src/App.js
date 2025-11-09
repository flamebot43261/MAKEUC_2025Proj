import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import MyProfilePage from './components/MyProfilePage';
import CreateProfile from './pages/CreateProfile';
import CreateAListing from './pages/CreateAListing';
import AppointmentsPage from './pages/AppointmentsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/users/:userId" element={<MyProfilePage />} />
        <Route path="/users/:userId/appointments" element={<AppointmentsPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/create-listing" element={<CreateAListing />} />
      </Routes>
    </Router>
  );
}

export default App;
