import React, { useState } from 'react';
import GameGrid from '../components/GameGrid';
import '../styles/VisualGame.css';
import Timer from '../components/Timer'

const VisualGame = () => {
  const [timeLeft, setTimeLeft] = useState(60); // Set initial time limit
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1); // 1 = Easy, 2 = Medium, 3 = Hard

  return (
    <div className="vg-container flex flex-col items-center mt-10 bg-black bg-opacity-50 px-4 py-2 rounded">
      <h1 className="text-3xl font-bold mb-4">Visual Memory Game</h1>
      <Timer 
       timeLeft={timeLeft}
       setTimeLeft={setTimeLeft}
       totalTime={60}
       gameOver = {gameOver}
      />
      <GameGrid
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        gameOver={gameOver}
        setGameOver={setGameOver}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
    </div>
  );
};

export default VisualGame;