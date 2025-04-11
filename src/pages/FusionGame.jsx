import React, {useState, useEffect} from 'react';
import '/src/styles/FusionGame.css'
import FusionStartScreen from '../components/FusionQuest/FusionStartScreen.jsx';
import {Link} from 'react-router-dom';
import DualNBackGame from '../components/FusionQuest/DualNBackGame.jsx'
import {useAuth} from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import {logout} from '../auth.js'

const FusionGame = () => {

    const [gameStarted, setGameStarted] = useState(false);
    const [nBack, setNBack] = useState(null);
    const { user } = useAuth();
    const firstName = user?.displayName?.split(" ")?.[0] || "friend";
    const navigate = useNavigate();
    const handleLogout = async () => {
            try {
              await logout();
              navigate("/");
            } catch (error){
              console.error("Error signing out: ", error);
            }
          };
    

    return (
        <div className = "fg-container">
            {!gameStarted ? (<div>
                <FusionStartScreen setGameStarted={setGameStarted} setNBack={setNBack} /> 
                </div>)
            : 
            (<div>
            <DualNBackGame n={nBack} />
            <Link
            to="/GameModes"
            className="font-bold absolute top-1 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700">
            ⬅ Back to Game Modes
            </Link>
            <button className="font-bold absolute top-12 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700" onClick = {()=> setGameStarted(false)}> Instructions / Change N back </button>
            </div>)
            }
            <div className="absolute flex flex-col justify-center items-center bg-opacity-80 top-0 right-30 m-4 bg-white p-2 rounded-2xl shadow-lg">
                <div className="welcome-message text-2xl">{`Welcome, ${firstName}! 👋`}</div>
                <button className ="underline hover:bg-blue-300 sign-out text-sm rounded-xl" onClick = {handleLogout}>Sign out</button>
            </div>
        </div>
    )
}

export default FusionGame;