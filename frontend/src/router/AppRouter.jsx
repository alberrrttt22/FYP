// src/router/AppRouter.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../App.jsx';
import GameModes from '../pages/GameModes.jsx';
import BackgroundAudio from '../components/BackgroundAudio.jsx';
import VisualGame from '../pages/VisualGame.jsx';

const AppRouter = () => {

  const [audioSrc, setAudioSrc] = useState('/sounds/oceansofserenity.mp3');
  const location = useLocation();

  useEffect(() => {
    // Update the audio source based on the current location
    if (location.pathname === '/VisualGame') {
      setAudioSrc('/sounds/oceansofserenityupbeat.mp3'); // Different audio for GameModes page
    } else {
      setAudioSrc('/sounds/oceansofserenity.mp3'); // Default audio for other pages
    }
  }, [location.pathname]);

  return (
    <div>
    <BackgroundAudio src={audioSrc} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/GameModes" element={<GameModes />} />
      <Route path="/VisualGame" element={<VisualGame />} />
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