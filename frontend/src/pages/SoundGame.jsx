import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/SoundGame.css';
import Piano from '../components/Piano.jsx';


const SoundGame = () => {


    return (
        <div className='sg-container flex flex-col items-center'>
            <Piano />
        </div>
    )
}


export default SoundGame;