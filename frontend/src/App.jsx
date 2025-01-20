import React, { useState } from 'react';
import './App.css';
import BackgroundAudio from './components/BackgroundAudio.jsx'
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState([]);
  const [backgroundSlide, setBackgroundSlide] = useState(false);
  const bubbleSound = new Audio('/sounds/bubbleSound.mp3');

  const handlePlayButtonClick = () => {
    bubbleSound.play().catch((err) => console.error('Error playing click sound:', err));
    createBubbles();
    setBackgroundSlide(true);
    setTimeout(() => {
      navigate('/GameModes');
    }, 2000);
  };

  const createBubbles = () => {
    const newBubbles = Array.from({ length: 20 }, (_, index) => ({
      id: index,
      left: Math.random() * 100 + '%',
    }));
    setBubbles(newBubbles);

    // Remove bubbles after animation
    setTimeout(() => {
      setBubbles([]);
    }, 2000);
  };

  return (
    <div className={`app-container ${backgroundSlide ? 'slide-up' : ''}`}>
      <div className="play-button" onClick={handlePlayButtonClick}>
        <img 
          src="/public/images/start-button.png" 
          alt="Play Button" 
          className="w-50 rounded-md hover:scale-110 transition-transform duration-300 cursor-pointer" />
      </div>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{ left: bubble.left }}
        />
      ))}
      <BackgroundAudio src="/sounds/oceansofserenity.mp3" />
    </div>
  );
};


export default App;