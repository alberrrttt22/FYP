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
            <img className="game-logo" src="/images/sound-quest-logo.jpg" alt="Sound Memory" onClick={() => handleGameMode('SoundGame')} />
            <div className="game-description">
              <h3>Sound Quest</h3>
              <p>Train your memory by matching sounds. Sharpen your auditory skills!</p>
            </div>
          </div>
        </div>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/images/visual-quest-logo1.jpg" alt="Visual Memory" onClick={() => handleGameMode('VisualGame')} />
            <div className="game-description">
              <h3>Visual Quest</h3>
              <p>Improve your visual recall with fun, photo-based memory challenges.</p>
            </div>
          </div>
        </div>
        <div className="game-mode-selection">
          <div className="game-mode-item">
            <img className="game-logo" src="/images/fusion-quest-logo.jpg" alt="Fusion Quest" onClick={() => handleGameMode('FusionGame')} />
            <div className="game-description">
              <h3>Fusion Quest</h3>
              <p>Enhance your memory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default GameModes;