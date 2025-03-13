import React, {useState, useEffect} from "react";
import "../styles/Piano.css";

const Piano = ({onNotePlayed}) => {
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

      const noteSounds = notes.reduce((acc, note) => {
        const safeKey = note.key.replace("#", "sharp");
      
        // Create an array of audio instances to allow overlapping
        acc[note.key] = Array.from({ length: 1 }, () => new Audio(`/sounds/piano/${safeKey}.mp3`));
        
        return acc;
      }, {});
      
      let playIndex = {}; // Keeps track of which instance to play next
      
      const playNote = (note) => {
        if (noteSounds[note]) {
          if (!playIndex[note]) playIndex[note] = 0; // Initialize play index
      
          const audio = noteSounds[note][playIndex[note]]; // Get the next audio instance
          audio.currentTime = 0; 
          audio.play();
      
          playIndex[note] = (playIndex[note] + 1) % noteSounds[note].length; // Cycle through instances
        }
      
        setActiveKey(note);
        onNotePlayed && onNotePlayed(note);
        setTimeout(() => setActiveKey(null), 200);
      }

      const handleKeyPress = (event) => {
        const note = notes.find((n) => n.keyBinding === event.key)?.key;  //'?' makes it so that if find() returns undefined, note will be set to undefined and wont throw an error
        if (note) {
            playNote(note);
        }
      };

      useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
      }, []);

      return (
        <div className="piano">
            {notes.map(({key, type}) => (
                <div
                key={key}
                className={`piano-key ${type} ${activeKey === key? "active": ""}`}
                onClick={() => playNote(key)}
                >
                {key}
                </div>
            ))}
        </div>
      );
};


export default Piano;