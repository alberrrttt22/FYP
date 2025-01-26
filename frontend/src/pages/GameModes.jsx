import React from 'react'; 
import '../styles/GameModes.css'; 

const GameModes = () => {
  return (
    <div className="container">
      <div className="game-mode-container">
        <h1 className="game-mode-title">Choose your game mode</h1>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/path/to/sound/memory/image.png" alt="Sound Memory" onClick={() => handleGameMode('sound')} />
            <div className="game-description">
              <h3>Sound Memory</h3>
              <p>Train your memory by matching sounds. Sharpen your auditory skills!</p>
            </div>
          </div>
        </div>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/images/visualmemory.jpg" alt="Visual Memory" onClick={() => handleGameMode('photo')} />
            <div className="game-description">
              <h3>Visual Memory</h3>
              <p>Improve your visual recall with fun, photo-based memory challenges.</p>
            </div>
          </div>
        </div>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/path/to/flashcard/image.png" alt="Flashcard Mode" onClick={() => handleGameMode('flashcard')} />
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

const handleGameMode = (gameMode) => {
  // Navigate to the corresponding game screen
  // Example using React Router:
  // useHistory hook (if using useHistory)
  // useNavigate hook (if using useNavigate)
  // ... navigation logic ...
};

export default GameModes;