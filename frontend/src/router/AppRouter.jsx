// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../App';
import GameModes from '../pages/GameModes.jsx';

const AppRouter = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GameModes" element={<GameModes />} />
      </Routes>
    </Router>
    </div>
  );
};

export default AppRouter;