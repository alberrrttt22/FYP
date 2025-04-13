import React from 'react'; 
import '../styles/GameModes.css'; 
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";
import { logout } from "../auth";
import {Link} from 'react-router-dom';

const GameModes = () => {
  const navigate = useNavigate(); 
  const handleGameMode = (gameMode) => {
    navigate(`/${gameMode}`)
    };
  const { user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error){
      console.error("Error signing out: ", error);
    }
  };
  const firstName = user?.displayName?.split(" ")?.[0] || "friend";
  
  return (
    <div className="container">
      <div className="game-mode-container">
        
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
              <p>Enhance both visual and auditory memory.</p>
            </div>
          </div>
        </div>
      </div>
      <Link
          to="/Dashboard"
          className="font-bold absolute top-1 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
      >
          Dashboard
      </Link>
      <div className="absolute flex flex-col justify-center items-center bg-opacity-80 top-0 right-0 m-4 pr-1 pl-1 ">
        <div className="welcome-message text-sm text-white ">{`Welcome, ${firstName}! `}</div>
        <button className ="underline hover:bg-blue-700 sign-out text-xs rounded-xl text-white" onClick = {handleLogout}>Sign out</button>
      </div>
    </div>
  );
};



export default GameModes;