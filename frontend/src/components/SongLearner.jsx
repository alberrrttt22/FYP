import React, { useState, useEffect } from "react";
import '../styles/Piano.css'

const songs = {
  mary: ["e4", "d4", "c4", "d4", "e4", "e4", "e4", "d4", "d4", "d4", "e4", "g4", "g4"],
  twinkle: ["c4", "c4", "g4", "g4", "a4", "a4", "g4", "f4", "f4", "e4", "e4", "d4", "d4", "c4"],
};

const SongLearner = ({ song, notePlayed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const songNotes = songs[song];

  useEffect(() => {
    setCurrentIndex(0); // Reset progress when the song changes
  }, [song]);

  useEffect(() => {
    if (notePlayed && notePlayed === songNotes[currentIndex]) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [notePlayed]); // Runs every time notePlayed changes

  return (
    <div className="song-learner">
      <h2>Learn: {song.replace(/^\w/, (c) => c.toUpperCase().replace("mary", "Mary Had a Little Lamb").replace("twinkle", "Twinkle Twinkle Little Star"))}</h2>
      <div className="notes-display">
        {songNotes.map((note, index) => (
          <span
            key={index}
            className={`note ${index === currentIndex ? "current" : index < currentIndex ? "completed" : ""}`}
          >
            {note}
          </span>
        ))}
      </div>
      {currentIndex === songNotes.length && 
      <div>
      <p className="success-message">🎉 Well done! You've completed the song!</p>
      <button className="restart-button" onClick={() => setCurrentIndex(0)}> Try again? </button>
      </div>
      }
    </div>
  );
};

export default SongLearner;