import React, { useState } from 'react';
import GameGrid from '../components/GameGrid';

const VisualGame = () => {
  const [timeLeft, setTimeLeft] = useState(60); // Set initial time limit
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1); // 1 = Easy, 2 = Medium, 3 = Hard

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Visual Memory Game</h1>
      <p>Time Left: {timeLeft}s</p>
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