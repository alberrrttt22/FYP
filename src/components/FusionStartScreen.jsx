import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const FusionStartScreen = ({ setGameStarted, setNBack }) => {

  const startGame = (n) => {
    setNBack(n);
    setGameStarted(true);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
      {/* Scroll Background */}
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
        {/* Content */}
        <div className="p-6 max-w-[90%] mx-auto bg-opacity-70 rounded-md">
          <h2 className="text-xl font-bold text-center mb-2">🌊 Deep Sea Fusion Quest 🧠</h2>
          <p className="text-lg leading-relaxed">
            Dive into the magical underwater world, where memory is the key to unlocking the secrets of the sea. 
            Sea creatures and ocean sounds appear in mysterious patterns. 
            Only the cleverest explorers can track what they saw and heard <b>N steps ago</b>! 🐙🎶
          </p>
          <p className="mt-4 text-md text-gray-700 leading-relaxed">
            🐠 <strong>How to Play:</strong>
            <br /> - Watch the sea creature appear in a bubble.
            <br /> - Listen for the ocean sound (like a whale call or splash).
            <br /> - If the <b>position</b> is the same as N turns ago, click the <b>🐚 Position Button</b>.
            <br /> - If the <b>sound</b> is the same as N turns ago, click the <b>🎵 Sound Button</b>.
            <br /> - You can click both if both match!
            <br /> - Start with 1-Back and grow your memory to become a Deep Sea Master.
          </p>
        </div>

        {/* Start Button */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => startGame(1)}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
          >
            1 Back
          </button>
          <button
            onClick={() => startGame(2)}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
          >
            2 Back
          </button>
          <button
            onClick={() => startGame(3)}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
          >
            3 Back
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
  );
};

export default FusionStartScreen;
