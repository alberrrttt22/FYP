import React, {useState, useEffect} from 'react';
import '../styles/FusionGame.css'
import FusionStartScreen from '../components/FusionStartScreen.jsx';
import {Link} from 'react-router-dom';
import DualNBackGame from '../components/DualNBack/DualNBackGame.jsx'


const FusionGame = () => {

    const [gameStarted, setGameStarted] = useState(false);
    const [nBack, setNBack] = useState(null);

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
            <button className="font-bold absolute top-12 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700" onClick = {()=> setGameStarted(false)}> Instructions </button>
            </div>)
            } 
        </div>
    )
}

export default FusionGame;