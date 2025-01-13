import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Timer from './components/Timer';
import GameGrid from './components/GameGrid';
import BackgroundAudio from './components/BackgroundAudio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page components
import GameModes from './components/GameModes';
import Dashboard from './components/Dashboard';
import FlashcardMode from './components/FlashcardMode';
import Settings from './components/Settings';
import SignOut from './components/SignOut';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

  const difficultyChange = (level) => {
    setGameStarted(true);
    setGameOver(false); // Reset game over state when starting a new game
    setTimeLeft(60); // Reset time when starting a new game
    setDifficulty(level);
  };

  return (
    <Router>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Routes>
        <Route path="/" element = {
        <>
        <h1 className="text-center text-2xl font-bold mb-4">Memory Training</h1>
        {!gameStarted ? (
          <div className="flex flex-row justify-center items-center gap-4">
            <button
              onClick={() =>difficultyChange(1)}
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mb-4 w-24 h-12"
            >
              Easy
            </button>
            <button
              onClick={() => difficultyChange(2)}
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mb-4 w-24 h-12"
            >
              Medium
            </button>
            <button
              onClick={() =>difficultyChange(3)}
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mb-4 w-24 h-12"
            >
              Hard
            </button>
          </div>
        ) : (
          <>
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} totalTime={60} gameOver={gameOver} />
          <GameGrid timeLeft={timeLeft} gameOver = {gameOver} setGameOver={setGameOver} setTimeLeft = {setTimeLeft} difficulty = {difficulty} setDifficulty={setDifficulty}  />
          </>
        )}
        </>
        } />
        <Route path="/game-modes" element={<GameModes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flashcard-mode" element={<FlashcardMode />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sign-out" element={<SignOut />} />
        </Routes>
      </div>
      <BackgroundAudio  src="/sounds/subwaysurfers.mp3" />
    </div>
    </Router>
    
  );
}

export default App;