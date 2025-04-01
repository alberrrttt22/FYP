import React, { useState, useEffect } from 'react';

const BackgroundAudio = ({ src }) => {
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const [userInteracted, setUserInteracted] = useState(false); // Track user interaction
  const [bgm, setBgm] = useState(() => new Audio(src)); // Initialize audio

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        bgm.play().catch((err) => console.error('Error playing audio:', err));
      }
    };

    window.addEventListener('click', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  }, [userInteracted, bgm]);

  useEffect(() => {
    bgm.loop = true; // Enable looping
    if (!isMuted && userInteracted) {
      bgm.play().catch((err) => console.error('Error playing audio:', err));
    } else {
      bgm.pause();
    }
    return () => bgm.pause(); // Cleanup on unmount
  }, [isMuted, userInteracted, bgm]);

  useEffect(() => {
    bgm.pause();
    const newBgm = new Audio(src); 
    setBgm(newBgm); 
    newBgm.loop = true; 
    if (!isMuted && userInteracted) {
      newBgm.play().catch((err) => console.error('Error playing audio:', err));
    }
    return () => newBgm.pause(); // Cleanup
  }, [src]); 

  return (
    <div>
      <img
        src={isMuted ? '/images/unmute-icon.png' : '/images/mute-icon.png'}
        alt={isMuted ? 'Muted' : 'Unmuted'}
        className="w-8 h-8 z-50 fixed bottom-4 right-4 cursor-pointer rounded-full hover:bg-gray-300 transition duration-200"
        onClick={() => setIsMuted((prev) => !prev)}
      />
    </div>
  );
};

export default BackgroundAudio;