import React, {useState, useEffect} from "react";
import "../styles/Piano.css";

const Piano = ({onNotePlayed}) => {
    const notes = [
        { key: "C6", type: "white", keyBinding: "a" },
        { key: "C#6", type: "black", keyBinding: "w" },
        { key: "D6", type: "white", keyBinding: "s" },
        { key: "D#6", type: "black", keyBinding: "e" },
        { key: "E6", type: "white", keyBinding: "d" },
        { key: "F6", type: "white", keyBinding: "f" },
        { key: "F#6", type: "black", keyBinding: "t" },
        { key: "G6", type: "white", keyBinding: "g" },
        { key: "G#6", type: "black", keyBinding: "y" },
        { key: "A6", type: "white", keyBinding: "h" },
        { key: "A#6", type: "black", keyBinding: "u" },
        { key: "B6", type: "white", keyBinding: "j" }
      ];

      const [activeKey, setActiveKey] = useState(null);

      const noteSounds = notes.reduce((acc, note) => {
        acc[note.key] = new Audio('/sounds/piano/${note.key}.mp3');
        return acc;
      }, {});

      const playNote = (note) => {
        if (noteSounds[note]){
            noteSounds[note].currentTime = 0;
            noteSounds[note].play();
        }
        setActiveKey(note);
        onNotePlayed && onNotePlayed(note);
        setTimeout(() => setActiveKey(null), 200);
      };

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