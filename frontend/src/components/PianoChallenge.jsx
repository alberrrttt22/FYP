import React, { useState, useEffect } from "react";
import Piano from "./Piano";

const PianoChallenge = () => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("Remember these notes");
  const [isUserTurn, setIsUserTurn] = useState(false);
  
  const notes = ["c4", "c#4", "d4", "d#4", "e4", "f4", "f#4", "g4", "g#4", "a4", "a#4", "b4", "c5"];
  
  useEffect(() => {
    startNewLevel();
  }, []);

  const startNewLevel = () => {
    setMessage("Remember these notes");
    setIsUserTurn(false);
    const newSequence = Array.from({ length: level }, () => notes[Math.floor(Math.random() * notes.length)]);
    setSequence(newSequence);
    setUserInput([]);
    playSequence(newSequence);
  };

  const playSequence = async (seq) => {
    setPlaying(true);
    for (let note of seq) {
      await playNoteWithDelay(note, 600);
    }
    setPlaying(false);
    setIsUserTurn(true);
    setMessage("Your turn! Play the same notes");
  };

  const playNoteWithDelay = (note, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const audio = new Audio(`/sounds/piano/${note.replace("#", "sharp")}.mp3`);
        audio.play();
        resolve();
      }, delay);
    });
  };

  const handleUserInput = (note) => {
    if (!isUserTurn) return; // Prevent input during playback
    
    const updatedInput = [...userInput, note];
    setUserInput(updatedInput);
    
    if (note !== sequence[updatedInput.length - 1]) {
      setMessage("Wrong note! Restarting from Level 1.");
      setLevel(1);
      setTimeout(startNewLevel, 2000);
      return;
    }
    
    if (updatedInput.length === sequence.length) {
      setMessage("Correct! Moving to next level.");
      setLevel((prev) => prev + 1);
      setTimeout(startNewLevel, 1000);
    }
  };

  return (
    <div className="piano-challenge-container">
      <h2>Challenge Mode - Level {level}</h2>
      <p className="message">{message}</p>
      <Piano onNotePlayed={handleUserInput} />
    </div>
  );
};

export default PianoChallenge;
