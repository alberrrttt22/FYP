import React, {useEffect, useState, useRef} from "react";
import '../../styles/Piano.css';
import songData from '../../assets/songsData.json';
import { saveScore } from "../../firestoreHelpers"; 
import { useAuth } from "../../context/AuthContext";


const SongTester = ({song, notePlayed, setTestMode, currentIndex, setCurrentIndex}) => {
    const [completedNotes, setCompletedNotes] = useState([]);
    const [wrongNotes, setWrongNotes] = useState([]);
    const [correct, setCorrect] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const hasStartedRef = useRef(false);

    const songName = songData.songNames[song];
    const songNotes = songData.songs[song];
    const {user} = useAuth();
    const accuracy = ((completedNotes.length)/(completedNotes.length + wrongNotes.length)*100).toFixed(1);
    


    useEffect(()=> {
    
        if (!notePlayed) {
            hasStartedRef.current = true;
            return;
        }

        if (!hasStartedRef.current) {
            hasStartedRef.current = true;
            return;
        }

        if (notePlayed && notePlayed === songNotes[currentIndex]){
            setCompletedNotes((prevNotes) => [...prevNotes, notePlayed]);
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setCorrect(true);
            console.log({currentIndex});
            setIsStarted(true);
        }
        else if (notePlayed){
            setWrongNotes((prevNotes) => [...prevNotes, notePlayed]);
            setCorrect(false);
            setIsStarted(true);
        }
    }, [notePlayed]);


    useEffect(()=>{
        setCurrentIndex(0);
        setCorrect(null);
        setWrongNotes([]);
        setCompletedNotes([]);
        setIsStarted(false);
    }, [songName]);


    useEffect(() => {
        if (currentIndex === songNotes.length && user) {
          saveScore(user.uid, "SoundQuest", songName, `${accuracy}%`, "Freeplay");
        }
    }, [currentIndex, user, accuracy, songName]);

    return (
        <div className="song-tester">

        {currentIndex !== songNotes.length && 
        <div>
        <div className="song-title">Try playing: {songName}</div>
        <div className="feedback-container">
            <div className={`feedback ${!isStarted ? 'neutral' : correct ? 'correct' : 'wrong'}`} />
        </div>
        <button className="test-restart-button" onClick={()=> 
        {setCurrentIndex(0);
         setCorrect(null);
         setWrongNotes([]);
         setCompletedNotes([]);
         setIsStarted(false);
        }}> Restart </button>
        <button className="practice-button"onClick={()=> setTestMode(false)}>Back to practice</button>
        </div>}

        {currentIndex === songNotes.length && 
        <div>
        <div className="stats">Song Stats: </div>
        <div>Accuracy: {((completedNotes.length)/(completedNotes.length + wrongNotes.length)*100).toFixed(1)}% </div>
        <button className="test-restart-button" onClick={()=> 
        {setCurrentIndex(0);
         setCorrect(null);
         setWrongNotes([]);
         setCompletedNotes([]);
         setIsStarted(false);
        }}> Restart </button>
        <button className="practice-button"onClick={()=> setTestMode(false)}>Back to practice</button>
        </div>}
        
        
        </div>
    );
};

export default SongTester;
