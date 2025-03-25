import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/SoundGame.css';
import Piano from '../components/Piano.jsx';
import PianoStartScreen from '../components/PianoStartScreen.jsx';
import PianoChallengeMode from '../components/PianoChallengeMode.jsx';
import PianoChallenge from '../components/PianoChallenge.jsx';

const SoundGame = () => {

    const [gameMode, setGameMode] = useState(null); 
    const [gameStarted, setGameStarted] = useState(false);


    return (
        <div className='sg-container flex flex-col items-center'>
            <h1 className="vg-header text-3xl font-bold mb-4">Sound Quest</h1>
            {!gameStarted ? (
                <PianoStartScreen setGameMode = {setGameMode} setGameStarted={setGameStarted} />
            ):(
                <div>
                <Piano setGameMode={setGameMode} gameMode = {gameMode} /> 
                <Link
                          to="/GameModes"
                          className="font-bold absolute top-1 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
                        >
                          ⬅ Back to Game Modes
                </Link>
                <button className="font-bold absolute top-12 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700" onClick = {()=> setGameStarted(false)}> Instructions </button>
                </div>
            )
            }
        </div>
    )
}


export default SoundGame;