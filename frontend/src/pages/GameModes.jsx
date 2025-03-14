import React from 'react'; 
import '../styles/GameModes.css'; 
import { useNavigate } from 'react-router-dom';

const GameModes = () => {
  const navigate = useNavigate(); // Hook for navigation
  const handleGameMode = (gameMode) => {
    navigate(`/${gameMode}`)
    };

  return (
    <div className="container">
      <div className="game-mode-container">
        <h1 className="game-mode-title">Choose your game mode</h1>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/images/soundmemory.jpg" alt="Sound Memory" onClick={() => handleGameMode('SoundGame')} />
            <div className="game-description">
              <h3>Sound Memory</h3>
              <p>Train your memory by matching sounds. Sharpen your auditory skills!</p>
            </div>
          </div>
        </div>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/images/visualmemory.jpg" alt="Visual Memory" onClick={() => handleGameMode('VisualGame')} />
            <div className="game-description">
              <h3>Visual Memory</h3>
              <p>Improve your visual recall with fun, photo-based memory challenges.</p>
            </div>
          </div>
        </div>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/images/flashcardmode1.jpg" alt="Flashcard Mode" onClick={() => handleGameMode('flashcard')} />
            <div className="game-description">
              <h3>Flashcard Mode</h3>
              <p>Enhance your memory with customizable flashcard games.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default GameModes;