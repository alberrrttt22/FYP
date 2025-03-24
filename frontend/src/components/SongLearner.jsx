import React, { useState, useEffect, useRef } from "react";
import '../styles/Piano.css'

const songs = {
  mary: ["e4", "d4", "c4", "d4", "e4", "e4", "e4", 
    "d4", "d4", "d4", "e4", "g4", "g4",
    "e4", "d4", "c4", "d4", "e4", "e4", "e4",
    "e4", "d4", "d4", "e4", "d4", "c4"],
  twinkle: ["c4", "c4", "g4", "g4", "a4", "a4", "g4", 
    "f4", "f4", "e4", "e4", "d4", "d4", "c4",
    "g4", "g4", "f4", "f4", "e4", "e4", "d4",
    "g4", "g4", "f4", "f4", "e4", "e4", "d4",
    "c4", "c4", "g4", "g4", "a4", "a4", "g4",
    "f4", "f4", "e4", "e4", "d4", "d4", "c4",
    ],
  ode: ["f#4", "f#4", "g4", "a4", "a4", "g4", "f#4", "e4", 
    "d4", "d4", "e4", "f#4", "f#4", "e4", "e4",
    "f#4", "f#4", "g4", "a4", "a4", "g4", "f#4", "g4", "e4",
    "d4", "d4", "e4", "f#4","e4", "d4", "d4"],
  happy: ["c4", "c4", "d4", "c4", "f4", "e4",    
    "c4", "c4", "d4", "c4", "g4", "f4",    
    "c4", "c4", "c5", "a4", "f4", "e4", "d4",    
    "a#4", "a#4", "a4", "f4", "g4", "f4"],
  jingle: ["e4", "e4", "e4", "e4", "e4", "e4", "e4", "g4", "c4", "d4", "e4",
    "f4", "f4", "f4", "f4", "f4", "e4", "e4", "e4", "e4",
    "e4", "d4", "d4", "e4", "d4", "g4",
    "e4", "e4", "e4", "e4", "e4", "e4", "e4", "g4", "c4", "d4", "e4",
    "f4", "f4", "f4", "f4", "f4", "e4", "e4", "e4", "e4",
    "g4", "g4", "f4", "d4", "c4"
  ]
};

const songNames = {
    mary: "Mary Had a Little Lamb",
    twinkle: "Twinkle Twinkle Little Star",
    ode: "Ode to Joy",
    happy: "Happy Birthday",
    jingle: "Jingle Bells"
  };

const SongLearner = ({ song, notePlayed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [display, setDisplay] = useState(false);
  const songNotes = songs[song];
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
  }, [notePlayed]); // Runs every time notePlayed changes

  useEffect(() => {
    setDisplay(false);
  }, [song])

  const getCurrentNotes = () => {
    const remainingNotes = songNotes.slice(currentIndex, currentIndex + 8); // Display next 8 notes
    return remainingNotes;
  };


  return (
    <div className="song-learner">
      <h2>Learn: {songNames[song] || "Select a song"}</h2>
      
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
    </div>
  );
};

export default SongLearner;
