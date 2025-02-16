import React, { useState } from 'react';

const StartScreen = ({ setDifficulty }) => {
  const [showStartScreen, setShowStartScreen] = useState(true);

  const startGame = (difficulty) => {
    setDifficulty(difficulty);
    setShowStartScreen(false);
  };

  return showStartScreen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      {/* Scroll Image Background */}
      <div
        className="relative w-4/5 max-w-2xl p-8 rounded-lg shadow-lg border-4 border-yellow-700"
        style={{
          backgroundImage: "url('/images/scroll.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "40px",
        }}
      >
        {/* Scrollable Content Inside */}
        <div className="h-64 overflow-y-auto p-4 bg-white bg-opacity-70 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center mb-2">📜 Welcome to the Memory Quest! 🏆</h2>
          <p className="text-lg">
            Long ago, a powerful wizard hid magical relics within enchanted cards. Only the most
            skilled minds can uncover them. Match the cards, prove your memory, and restore the lost relics!
          </p>
          <p className="mt-4 text-md text-gray-700">
            🃏 **How to Play**:
            <br /> - Click on two cards to flip them.
            <br /> - Match all pairs before time runs out!
            <br /> - Different modes offer increasing challenges.
          </p>
        </div>

        {/* Buttons to Start Game */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => startGame(1)} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            Easy
          </button>
          <button onClick={() => startGame(2)} className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600">
            Medium
          </button>
          <button onClick={() => startGame(3)} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
            Hard
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default StartScreen;