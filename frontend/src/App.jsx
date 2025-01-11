import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Timer from './components/Timer';
import GameGrid from './components/GameGrid';
import BackgroundAudio from './components/BackgroundAudio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false); // Reset game over state when starting a new game
    setTimeLeft(60); // Reset time when starting a new game
  };

  return (
    <Router>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Routes>
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
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} gameOver={gameOver} />
          <GameGrid timeLeft={timeLeft} gameOver = {gameOver} setGameOver={setGameOver} setTimeLeft = {setTimeLeft}  />
          </>
        )}
        </Routes>
      </div>
      
      <BackgroundAudio  src="/sounds/subwaysurfers.mp3" />
      
    </div>
    </Router>
  );
}

export default App;