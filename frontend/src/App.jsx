import React, { useState } from 'react';
import './App.css';
import BackgroundAudio from './components/BackgroundAudio.jsx'

const App = () => {


  return (
    <div className="app-container">
      <div className="play-button">
        <img src="/public/images/start-button.png" alt="Play Button" className="w-50 rounded-md hover:scale-110 transition-transform duration-300 cursor-pointer" />
      </div>
      <BackgroundAudio src="/sounds/oceansofserenity.mp3" />
    </div>
  );
};


export default App;