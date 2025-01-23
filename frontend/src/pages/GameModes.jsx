import React from 'react'; 
import '../styles/GameModes.css'; 

const GameModes = () => {
  return (
    <div className="container">
      <div className="game-mode-container">
        <div className="game-mode-selection">
          <img src="/path/to/sound/memory/image.png" alt="Sound Memory" onClick={() => handleGameMode('sound')} />
        </div>
        <div className="game-mode-selection">
          <img src="/path/to/photo/memory/image.png" alt="Photo Memory" onClick={() => handleGameMode('photo')} />
        </div>
        <div className="game-mode-selection">
          <img src="/path/to/flashcard/image.png" alt="Flashcard Mode" onClick={() => handleGameMode('flashcard')} />
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