import React, { useState, useEffect, useRef } from "react";
import '../../styles/Piano.css'
import songsData from '../../assets/songsData.json'; 

const SongLearner = ({ song, notePlayed, setTestMode, currentIndex, setCurrentIndex }) => {
  const [completedNotes, setCompletedNotes] = useState([]);
  const [display, setDisplay] = useState(false);
  
  const songNotes = songsData.songs[song];
  const songNames = songsData.songNames[song];
//   const notesDisplayRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0); // Reset progress when the song changes
    setCompletedNotes([]); // Reset completed notes when song changes
  }, [song]);

  useEffect(() => {
    if (notePlayed && notePlayed === songNotes[currentIndex]) {
      setCompletedNotes((prevNotes) => [...prevNotes, notePlayed]); // Add completed note to the list
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next note
    }
  }, [notePlayed]); 

  useEffect(() => {
    setDisplay(false);
  }, [song])

  const getCurrentNotes = () => {
    const remainingNotes = songNotes.slice(currentIndex, currentIndex + 8); // Display next 8 notes
    return remainingNotes;
  };


  return (
    <div className="song-learner">
      <h2>Learn: {songNames || "Select a song"}</h2>
      
      {/* Display completed notes if user toggles */}
      {display && <div className="notes-display completed">
        {completedNotes.map((note, index) => (
          <div key={index} className="note completed">{note}</div>
        ))}
      </div>
      }

      {/* Display current notes */}
      <div className="notes-display current">
        {getCurrentNotes().map((note, index) => (
          <span key={index} 
          className={`note current ${index === 0 ? 'next-note' : 'rest-note'}`}>{note}</span>
        ))}
      </div>

      {currentIndex !== songNotes.length &&<button className="restart-button" onClick={() => { setCurrentIndex(0); setCompletedNotes([]); setDisplay(false); }}>Restart?</button>}

      {currentIndex === songNotes.length &&
        <div>
          <p className="success-message">🎉 Well done! You've completed the song!</p>
          <button className="restart-button" onClick={() => { setCurrentIndex(0); setCompletedNotes([]); setDisplay(false); }}>Try again?</button>
          {!display ? <button className="display-button" onClick={() => { setDisplay(true); }}>See all notes?</button> : 
          <button className="display-button" onClick={() => { setDisplay(false); }}>Hide all notes?</button> 
          }
        </div>
      }
    <button className="test-button" onClick={() => setTestMode(true)} >Test yourself</button>
    </div>
  );
};

export default SongLearner;
