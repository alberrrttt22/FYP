import React, { useState, useEffect, useRef } from "react";
import "../styles/Piano.css";
import { useNavigate } from "react-router-dom";

const Piano = ({ onNotePlayed, setGameMode, gameMode}) => {
  const notes = [
    { key: "c4", type: "white", keyBinding: "a" },
    { key: "c#4", type: "black", keyBinding: "w" },
    { key: "d4", type: "white", keyBinding: "s" },
    { key: "d#4", type: "black", keyBinding: "e" },
    { key: "e4", type: "white", keyBinding: "d" },
    { key: "f4", type: "white", keyBinding: "f" },
    { key: "f#4", type: "black", keyBinding: "t" },
    { key: "g4", type: "white", keyBinding: "j" },
    { key: "g#4", type: "black", keyBinding: "i" },
    { key: "a4", type: "white", keyBinding: "k" },
    { key: "a#4", type: "black", keyBinding: "o" },
    { key: "b4", type: "white", keyBinding: "l" },
    { key: "c5", type: "white", keyBinding: ";" },
  ];

  const [activeKey, setActiveKey] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [level, setLevel] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState("Remember these notes");

  const navigate = useNavigate();
  // Store audio instances in useRef to avoid recreating them on every render
  const noteSounds = useRef({});

  useEffect(() => {
    // Preload audio files once
    noteSounds.current = notes.reduce((acc, note) => {
      const safeKey = note.key.replace("#", "sharp");
      const audio = new Audio(`/sounds/piano/${safeKey}.mp3`);
      audio.preload = "auto"; // Ensure audio is preloaded
      acc[note.key] = audio;
      return acc;
    }, {});

    return () => {
      // Cleanup: Pause all audio when component unmounts
      Object.values(noteSounds.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const playNote = (note) => {
    const audio = noteSounds.current[note];
    if (audio && audio.readyState >= 3) {
      audio.currentTime = 0; // Reset the playback time
      audio.play();
    }
    setActiveKey(note);
    onNotePlayed && onNotePlayed(note);
    setTimeout(() => setActiveKey(null), 200); // Reset active key
  };

  const handleKeyPress = (event) => {
    if (!isUserTurn) return;
    const note = notes.find((n) => n.keyBinding === event.key)?.key;
    if (note) handleUserInput(note);
  };

  const handleUserInput = (note) => {
    playNote(note);
    const newUserInput = [...userInput, note];
    setUserInput(newUserInput);

    if (newUserInput[newUserInput.length - 1] !== sequence[newUserInput.length - 1]) {
      setMistakes((prevMistakes) => prevMistakes + 1);
      if (mistakes + 1 >= 2) {
        setMessage("Game Over! Restarting...");
        setTimeout(startGame, 2000); // Restart game after delay
      }
      return;
    }

    if (newUserInput.length === sequence.length) {
      setTimeout(() => {
        setLevel(level + 1);
        setUserInput([]);
        setMessage("Remember these notes");
        setIsUserTurn(false);
        generateSequence(level + 1);
      }, 1000); // Wait a bit before progressing to the next level
    }
  };

  const generateSequence = (newLevel) => {
    const newNote = notes[Math.floor(Math.random() * notes.length)].key;
    const newSequence = [...sequence, newNote];
    if (newSequence.length > newLevel) {
      newSequence.length = newLevel; // Ensure sequence doesn't exceed the level
    }
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const playSequence = (seq) => {
    let i = 0;
    const interval = setInterval(() => {
      playNote(seq[i]);
      i++;
      if (i >= seq.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUserTurn(true);
          setMessage("Your turn! Play the same notes");
        }, 1000); // Give some time before user's turn
      }
    }, 1000); // Delay between notes
  };

  const startGame = () => {
    setSequence([]);
    setUserInput([]);
    setLevel(1);
    setMistakes(0);
    setMessage("Remember these notes");
    setIsUserTurn(false);
    generateSequence(1); // Start the game with level 1
  };

  useEffect(() => {
    startGame(); // Start game when component mounts
    document.addEventListener("keydown", handleKeyPress); // Add key press event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress); // Cleanup on unmount
      Object.values(noteSounds.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="piano-container">
      <h2 className = "message" >Level {level} <br></br>{message}</h2>
      <div className="piano">
        {notes.map(({ key, type }) => (
          <div
            key={key}
            className={`piano-key ${type} ${activeKey === key ? "active" : ""}`}
            onClick={() => isUserTurn && handleUserInput(key)} // Allow user to click on keys
          >
            {key}
          </div>
        ))}
      </div>

      {/* <button
        onClick={() => {
          setGameStarted(false);
          navigate("/SoundGame")}}
        className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 m-4"
      >
        Back to Sound Quest Start Screen
      </button> */}
      <div className="absolute top-0 right-0 m-4">
          <select
            value={gameMode}
            onChange={(e) => {
              setGameMode(e.target.value)
              navigate("/SoundGame")}}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            <option value="freeplay">Freeplay</option>
            <option value="challenge">Challenge</option>
          </select>
      </div>
    </div>
  );
};

export default Piano;
