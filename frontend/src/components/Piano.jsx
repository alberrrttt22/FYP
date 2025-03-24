import React, { useState, useEffect, useRef } from "react";
import "../styles/Piano.css";
import PianoChallenge from "./PianoChallenge";
import SongLearner from "./SongLearner";

const Piano = ({ setGameMode, gameMode }) => {
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
    { key: "c5", type: "white", keyBinding: ";" }
  ];

  const [activeKeys, setActiveKeys] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [notePlayed, setNotePlayed] = useState(null);
  
  const noteSounds = useRef({});

  useEffect(() => {
    // Initialize audio files once
    noteSounds.current = notes.reduce((acc, note) => {
      const safeKey = note.key.replace("#", "sharp");
      const audio = new Audio(`/sounds/piano/${safeKey}.mp3`);
      audio.preload = "auto"; // Ensure audio is preloaded
      acc[note.key] = audio;
      return acc;
    }, {});

    return () => {
      // Clean up on component unmount
      Object.values(noteSounds.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const handleKeyPress = (event) => {
    const pressedKey = event.key.toLowerCase();
    const note = notes.find((n) => n.keyBinding === pressedKey)?.key;
    if (note && !activeKeys.includes(note)) {
      playNote(note);
    }
  };

  const handleKeyRelease = (event) => {
    const releasedKey = event.key.toLowerCase();
    const note = notes.find((n) => n.keyBinding === releasedKey)?.key;
    if (note) {
      setActiveKeys((prevKeys) => prevKeys.filter((key) => key !== note));
    }
  };

  const playNote = (note) => {
    const audio = noteSounds.current[note]; 
    if (audio) {
      if (!audio.paused) {
        // If the same key is already playing, clone it to allow overlap
        const newAudio = audio.cloneNode();
        newAudio.play();
      } else {
        // Otherwise, just play normally
        audio.currentTime = 0;
        audio.play();
      }
    }
  
    setActiveKeys((prevKeys) => [...new Set([...prevKeys, note])]);
    setNotePlayed(null);
    setTimeout(() => setNotePlayed(note), 0);
    
  };

  useEffect(() => {
    const keyPressHandler = (event) => {
      handleKeyPress(event);
    };

    const keyReleaseHandler = (event) => {
      handleKeyRelease(event);
    };

    document.addEventListener("keydown", keyPressHandler);
    document.addEventListener("keyup", keyReleaseHandler);

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
      document.removeEventListener("keyup", keyReleaseHandler);
    };
  }, [activeKeys]); // Make sure the effect runs only when `activeKeys` changes.
  
  useEffect(()=>{
    setSelectedSong("");
  }, [gameMode])

  return (
    <div className="piano-container">
      {gameMode === "challenge" && <PianoChallenge />}
      <div className = {`${selectedSong ? 'song-learner' : ''}`}>
      {selectedSong && <SongLearner song={selectedSong} notePlayed = {notePlayed} />}
      </div>
      <div className = "piano">
      {notes.map(({ key, type }) => (
        <div
          key={key}
          className={`piano-key ${type} ${activeKeys.includes(key) ? "active" : ""}`}
          onMouseDown={() => playNote(key)}
          onMouseUp={() => setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key))}
        >
          {key}
        </div>
      ))}
      </div>
      <div className="absolute top-0 right-0 m-4">
          <select
            value={gameMode}
            onChange={(e) => {
              setGameMode(e.target.value)
              // navigate("/SoundGame")
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            <option value="freeplay">Freeplay</option>
            <option value="challenge">Challenge</option>
          </select>
      </div>
        
      {gameMode === "freeplay" && 
      <div className="absolute top-10 right-0 m-4">
        <select
        className = "song-select bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        onChange = {(e) => setSelectedSong(e.target.value)}
        onKeyDown={() => {}}
        >
        <option value="">Learn a song</option>
        <option value="happy">Happy Birthday</option>
        <option value="mary">Mary had a little lamb</option>
        <option value="twinkle">Twinkle Twinkle Little Star</option>
        <option value="ode">Ode to Joy</option>
        <option value="jingle">Jingle Bells</option>
        </select>
      </div>
      }
    </div>
  );
};

export default Piano;
