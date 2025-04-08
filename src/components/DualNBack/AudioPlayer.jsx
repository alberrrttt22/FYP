import React, { useEffect } from 'react';

const AudioPlayer = ({ sound, play }) => {
  useEffect(() => {
    if (play && sound) {
      const audio = new window.Audio(sound);
      audio.volume = 0.5
      audio.play().catch((err) => {
        console.warn('Audio play failed:', err);
      });
    }
  }, [sound, play]);

  return null;
};

export default AudioPlayer;
