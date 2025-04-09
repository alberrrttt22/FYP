import React, {useState, useEffect} from "react";
import SongLearner from './SongLearner';
import SongTester from "./SongTester";

const SongModule = ({song, notePlayed}) => {

    const [testMode, setTestMode] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() =>{
        setCurrentIndex(0);
    }, [testMode])

    return (
        <div>
            {!testMode ?
            <SongLearner song={song} notePlayed={notePlayed} setTestMode={setTestMode} currentIndex ={currentIndex} setCurrentIndex={setCurrentIndex}/>
            :<SongTester song={song} notePlayed={notePlayed} setTestMode={setTestMode} currentIndex ={currentIndex} setCurrentIndex={setCurrentIndex}/>
            }
        </div>
    );
};

export default SongModule;