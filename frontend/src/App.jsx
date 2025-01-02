import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Timer from './components/Timer';
import GameGrid from './components/GameGrid';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const startGame = () => setGameStarted(true);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <h1 className="text-center text-2xl font-bold mb-4">Memory Training</h1>
        {!gameStarted ? (
          <div className="flex flex-col items-center">
            <button
              onClick={startGame}
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mb-4"
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
            <GameGrid timeLeft={timeLeft} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;