import React, { useState, useEffect, useRef } from "react";
import "../styles/Piano.css"

const PianoChallenge = ({ notePlayed, playNote }) => {
  const [level, setLevel] = useState(1); // Current level
  const [sequence, setSequence] = useState([]); // Sequence of notes
  const [checker, setChecker] = useState(0); 
  const [isGameOver, setIsGameOver] = useState(false); // Game over state
  const [isComPlaying, setIsComPlaying] = useState(false); // To prevent user input while the computer is playing the sequence
  const [message, setMessage] = useState("Listen and play the notes");
  const [gameStarted, setHasGameStarted] = useState(false);

  const notes = [
    "c4", "c#4", "d4", "d#4", "e4", "f4", "f#4", "g4", "g#4", "a4", "a#4", "b4", "c5"
  ];

  const timeoutsRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  const startGame = () => {
    setIsGameOver(false);
    setSequence([]);
    setChecker(0);
    // setLevel(null);
    // setTimeout(()=> {setLevel(1), 0});
    setLevel(1);
    setIsComPlaying(false);
    setMessage("Listen and play the notes");
    setHasGameStarted(true);
  };


  const playSequence = (seq) => {
   let currentIndex = 0;
   console.log(seq);
   const playNextNote = () => {
     if (currentIndex < seq.length) {
       // Play the current note
       playNote(seq[currentIndex]);

       // Move to the next note after 500ms
       currentIndex++;
       const timeoutId = setTimeout(playNextNote, 600);
       timeoutsRef.current.push(timeoutId);
     } else {
       setIsComPlaying(false); // End the computer's turn after all notes are played
     }
   } ;
   // Start the sequence
   playNextNote();
  };


  useEffect(() => {
    
    return () => {
      // Clear all timeouts when component unmounts
      clearAllTimeouts();
    };
  }, []);


  const newLevelHandler = async () => {
    const newNote = notes[Math.floor(Math.random() * notes.length)];
    setSequence(prevSequence => {
      const updated = [...prevSequence, newNote];
      playSequence(updated); 
      return updated;
    });
  };


  // Will run at the start as level value of "1" is compared to "undefined"
  useEffect(() => {
    const handleLevelChange = async () => {
      setIsComPlaying(true);
      await newLevelHandler(); // wait for the sequence to finish playing
      setIsComPlaying(false);
    };
    
   if (gameStarted && !isGameOver){
    handleLevelChange();
   }
   if (isGameOver){
    setSequence([]);
   }
  }, [level, isGameOver, gameStarted]);


  useEffect(() => {
    if (gameStarted && notePlayed && !isGameOver && !isComPlaying){
      if (notePlayed === sequence[checker]) {
        setChecker((prev) => prev + 1);
        console.log(notePlayed)
        console.log("matches!");
        if (checker === sequence.length - 1){
          setTimeout(() => {
            setLevel((prev) => prev + 1);
            setMessage("Remember these notes")
          }, 1000); //Wait a bit before progressing to next level
        }
      }
      else {
        console.log("wrong note played!")
        setIsGameOver(true);
        clearAllTimeouts();
      }
    }
    
  }, [notePlayed])


  useEffect(() => {
    if (checker === sequence.length){
      setChecker(0);
    }
  }, [checker])


  //Temporary hook for debugging
  useEffect(() => {
    console.log("Updated checker value:", checker);
  }, [notePlayed]);

  return (
    <div className="piano-challenge">
      <div className={`challenge-box w-80 p-6 ${isGameOver ? "bg-gray-100" : "bg-white"} rounded-lg shadow-lg border ${isGameOver ? "border-gray-300" : "border-white"} mb-6`}>
        {!gameStarted ? 
        (<div>
          <button className="start-button" onClick = {() => startGame()}>Start Game</button>
        </div>)
        : 
        (!isGameOver ? (
          <div className="text-2xl text-center">
            <div className="text-green-700">Level {level}</div>
            <div>{message}</div>
          </div>
        ) : (
          <div className="text-2xl text-center">
            <div className="text-red-600">Game Over!</div>
            <div >You reached Level {level}</div>
            <button onClick={() => startGame()}>Try again?</button>
          </div>
        ))
        }
      </div>
    </div>
  );
}
export default PianoChallenge;
