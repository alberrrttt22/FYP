import React, { useState, useEffect } from "react";
import "../styles/Piano.css";

const PianoChallengeMode = () => {
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

  const [activeKey, setActiveKey] = useState(null);
  const [challengeSequence, setChallengeSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);

  const noteSounds = notes.reduce((acc, note) => {
    const safeKey = note.key.replace("#", "sharp");
    acc[note.key] = new Audio(`/sounds/piano/${safeKey}.mp3`);
    return acc;
  }, {});

  const playNote = (note) => {
    if (noteSounds[note]) {
      noteSounds[note].currentTime = 0;
      noteSounds[note].play();
    }
    setActiveKey(note);
    setTimeout(() => setActiveKey(null), 200);
  };

  const handleKeyPress = (event) => {
    const note = notes.find((n) => n.keyBinding === event.key)?.key;
    if (note && isUserTurn) {
      playNote(note);
      setUserInput((prev) => [...prev, note]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isUserTurn]);

  const playSequence = async (sequence) => {
    setIsUserTurn(false);
    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      playNote(sequence[i]);
    }
    setTimeout(() => setIsUserTurn(true), 700);
  };

  const generateNewSequence = () => {
    setShowLevelUp(true);
    setTimeout(() => setShowLevelUp(false), 1500);

    setUserInput([]);
    const newNote = notes[Math.floor(Math.random() * notes.length)].key;
    const newSequence = [...challengeSequence, newNote];
    setChallengeSequence(newSequence);

    setTimeout(() => playSequence(newSequence), 2000);
  };

  useEffect(() => {
    if (userInput.length === challengeSequence.length && isUserTurn) {
      if (JSON.stringify(userInput) === JSON.stringify(challengeSequence)) {
        setTimeout(() => {
          setLevel((prev) => prev + 1);
          generateNewSequence();
        }, 1000);
      } else {
        alert("Wrong sequence! Try again.");
        setChallengeSequence([]);
        setLevel(1);
        setUserInput([]);
        setIsUserTurn(false);
      }
    }
  }, [userInput]);

  useEffect(() => {
    setLevel(1);
    setChallengeSequence([]);
    setTimeout(generateNewSequence, 1000);
  }, []);

  return (
    <div className="piano-container relative">
      {showLevelUp && (
        <div className="level-up-animation absolute top-20 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white">
          Level {level}
        </div>
      )}

      <div className="piano">
        {notes.map(({ key, type }) => (
          <div
            key={key}
            className={`piano-key ${type} ${activeKey === key ? "active" : ""}`}
            onClick={() => isUserTurn && playNote(key)}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PianoChallengeMode;
