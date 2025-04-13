// src/router/AppRouter.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../App.jsx';
import GameModes from '../pages/GameModes.jsx';
import BackgroundAudio from '../components/BackgroundAudio.jsx';
import VisualGame from '../pages/VisualGame.jsx';
import SoundGame from '../pages/SoundGame.jsx';
import FusionGame from '../pages/FusionGame.jsx';
import Login from '../pages/Login.jsx'

import ProtectedRoute from '../components/ProtectedRoute.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import DashboardY from '../pages/DashboardY.jsx'

const AppRouter = () => {

  const [audioSrc, setAudioSrc] = useState('/sounds/oceansofserenity.mp3');
  const location = useLocation();

  useEffect(() => {
    // Update the audio source based on the current location
    if (location.pathname === '/VisualGame' || location.pathname === '/SoundGame' || location.pathname === '/FusionGame' ) {
      setAudioSrc('/sounds/oceansofserenityupbeat.mp3'); 
    } else {
      setAudioSrc('/sounds/oceansofserenity.mp3'); // Default audio 
    }
  }, [location.pathname]);

  return (
    <div>
    <BackgroundAudio src={audioSrc} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/GameModes" element={<ProtectedRoute>
        <GameModes />
        </ProtectedRoute>} />
      <Route path="/VisualGame" element={<ProtectedRoute>
        <VisualGame />
        </ProtectedRoute>} />
      <Route path="/SoundGame" element={<ProtectedRoute>
        <SoundGame />
        </ProtectedRoute>} />
      <Route path="/FusionGame" element={<ProtectedRoute>
        <FusionGame />
        </ProtectedRoute>} />
      <Route path="/Dashboard" element={<ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>} />
      {/* <Route path="/DashboardY" element={<DashboardY />}/> */}
      
    </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default AppWrapper;