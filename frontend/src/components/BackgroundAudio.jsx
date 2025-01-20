import React, { useState, useEffect } from 'react';

const BackgroundAudio = ({ src }) => {
  const [isMuted, setIsMuted] = useState(true); // Track mute/unmute state
  const [bgm] = useState(() => new Audio(src)); // Initialize audio

  useEffect(() => {
    bgm.loop = true; // Enable looping
    if (!isMuted) {
      bgm.play().catch((err) => console.error('Error playing audio:', err));
    } else {
      bgm.pause();
    }
    return () => bgm.pause(); // Cleanup on unmount
  }, [isMuted, bgm]);

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