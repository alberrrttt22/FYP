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
    <button className="fixed bottom-4 right-4 text-white px-4 py-2 rounded-full w-16 h-16 shadow-md hover:bg-gray-300 transition duration-200"
      onClick={() => setIsMuted((prev) => !prev)}
    >
      <img
          src={isMuted ? '/images/mute-icon.png' : '/images/unmute-icon.png'}
          alt={isMuted ? 'Muted' : 'Unmuted'}
          className="w-10 h-10" // Adjust size as needed
        />
    </button>
    </div>
  );
};

export default BackgroundAudio;