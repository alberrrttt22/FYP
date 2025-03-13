import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/SoundGame.css';
import Piano from '../components/Piano.jsx';
import PianoStartScreen from '../components/PianoStartScreen.jsx';
import PianoChallengeMode from '../components/PianoChallengeMode.jsx';

const SoundGame = () => {

    const [gameMode, setGameMode] = useState(null); 
    const [gameStarted, setGameStarted] = useState(false);


    return (
        <div className='sg-container flex flex-col items-center'>
            <h1 className="vg-header text-3xl font-bold mb-4">Sound Quest</h1>
            
            {/*Show start screen if game hasn't started yet */}
            {!gameStarted && (
                <PianoStartScreen setGameMode = {setGameMode} setGameStarted={setGameStarted} />
            )}

            {gameStarted && gameMode == "freeplay" && <Piano />}

            {gameStarted && gameMode == "challenge" && <PianoChallengeMode />}
        </div>
    )
}


export default SoundGame;