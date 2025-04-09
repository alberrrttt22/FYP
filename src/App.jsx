import React, { useState } from 'react';
import './App.css';
// import BackgroundAudio from './components/BackgroundAudio.jsx'
import { useNavigate} from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const bubbleSound = new Audio('/sounds/bubbleSound.mp3');

  const handlePlayButtonClick = () => {
    navigate('/GameModes');
    bubbleSound.play().catch((err) => console.error('Error playing click sound:', err));
    
  };

  return (
    <div className='app-container' >
      {/* <img className='title-logo' src="/images/title-logo.png"></img> */}
      <br></br>
      <div className="play-button mt-40" onClick={handlePlayButtonClick}>
        <img 
          src="/images/start-button.png" 
          alt="Play Button" 
          className="w-50 rounded-md hover:scale-110 transition-transform duration-300 cursor-pointer" />
      </div>
    </div>
  );
};


export default App;