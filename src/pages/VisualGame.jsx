import React, { useState } from 'react';
import VisualQuestGrid from '../components/VisualQuest/VisualQuestGrid';
import '../styles/VisualGame.css';
import Timer from '../components/VisualQuest/Timer'
import StartScreen from '../components/VisualQuest/VisualStartScreen';
import { Link } from 'react-router-dom';
import VQMultiplayer from '../components/VisualQuest/VQMultiplayer';

const VisualGame = () => {
  const [timeLeft, setTimeLeft] = useState(60); // Set initial time limit
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1); // 1 = Easy, 2 = Medium, 3 = Hard
  const [gameStarted, setGameStarted] = useState(false);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  return (
    <div className="vg-container flex flex-col items-center mt-10 bg-black bg-opacity-50 px-4 py-2 rounded">
      <h1 className="vg-header text-3xl font-bold mb-4">Memory Quest</h1>
      {!gameStarted ? (
        <StartScreen 
          setDifficulty={setDifficulty} 
          setGameStarted={setGameStarted} 
          setIsMultiplayer={setIsMultiplayer}
        />
      ) : isMultiplayer ? (
        <div>
          
          <VQMultiplayer 
            gameOver={gameOver}
            setGameOver={setGameOver}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
          />

          <Link
            to="/GameModes"
            className="font-bold absolute top-1 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            ⬅ Back to Game Modes
          </Link>
          <button 
            className="font-bold absolute top-12 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700" 
            onClick ={()=> setGameStarted(false)}
          >
            Instructions / Local Multiplayer
          </button>
        </div>
      ):(
        <>
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            difficulty = {difficulty}
            gameOver={gameOver}
            gameStarted={gameStarted}
          />

          <VisualQuestGrid
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            gameOver={gameOver}
            setGameOver={setGameOver}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
          />
        <Link
          to="/GameModes"
          className="font-bold absolute top-1 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          ⬅ Back to Game Modes
        </Link>
        <button 
          className="font-bold absolute top-12 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700" 
          onClick ={()=> setGameStarted(false)}
        >
            Instructions / Local Multiplayer
        
        </button>
        </>
      )}
    </div>
  );
};

export default VisualGame;