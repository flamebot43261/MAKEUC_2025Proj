import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';
import MyProfilePage from './components/MyProfilePage';
import CreateProfile from './pages/CreateProfile';
import CreateAListing from './pages/CreateAListing';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/create-listing" element={<CreateAListing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
