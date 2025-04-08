import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const PianoStartScreen = ({ setGameMode, setGameStarted }) => {

  const startGame = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
  };

  return PianoStartScreen ? (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
      {/* Scroll Image Background */}
      <div
        className="relative w-4/5 max-w-2xl p-8 rounded-lg shadow-lg"
        style={{
          backgroundImage: "url('/images/scroll.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "40px",
        }}
      >
        {/* Content Inside */}
        <div className="p-6 max-w-[90%] mx-auto bg-opacity-70 rounded-md">
          <h2 className="text-xl font-bold text-center mb-2">🌊 The Sunken Melody 🎶</h2>
          <p className="text-lg leading-relaxed">
            Deep beneath the ocean waves, hidden among coral reefs and shipwrecks, lies a <b>forbidden treasure chest</b>. 
            It is said that only those who <b>play the right melody</b> can unlock its secrets. The lost <b>harmonies of the sea</b> hold 
            the key—will you be the one to discover them?
          </p>
          <p className="mt-4 text-md text-gray-700 leading-relaxed">
            🎹 <strong>How to Play:</strong>
            <br /> - Freeplay Mode: Experiment and create beautiful melodies and learn new songs.
            <br /> - Challenge Mode: Listen carefully and repeat the notes to reveal the treasure. 
            <br /> Genius Mode will remove key highlighting
            <br /> - White Keys: "a" to "f" and "j" to ";" 
            <br /> - Black Keys: "w, e, t, i, o"
          </p>
        </div>

        {/* Buttons to Start Game */}
        <div className="flex justify-center gap-4 mt-4">
          <button 
            onClick={() => startGame("freeplay")} 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            🎵 Freeplay Mode
          </button>
          <button 
            onClick={() => startGame("challenge")} 
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
          >
            🎼 Challenge Mode
          </button>
        </div>

        {/* Back to Game Modes */}
        <div className="flex justify-center mt-4">
          <Link
            to="/GameModes"
            className="mt-2 mb-4 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            ⬅ Back to Game Modes
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};

export default PianoStartScreen;
