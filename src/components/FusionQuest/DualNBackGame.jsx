import React, { useEffect, useState, useRef } from 'react';
import Grid from './Grid.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import { generateRandomStimulus, isMatchNBack } from './StimulusController.jsx';
import ScoreDisplay from './ScoreDisplay.jsx';
import RepDisplay from './RepDisplay.jsx';
import '../../styles/FusionGame.css'

const DualNBackGame = ({ n }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [stimuliHistory, setStimuliHistory] = useState([]);
  const stimuliHistoryRef = useRef([]);

  const [currentStimulus, setCurrentStimulus] = useState(null);
  const currentStimulusRef = useRef(null);

  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const [responseGiven, setResponseGiven] = useState({ visual: false, audio: false });
  const responseGivenRef = useRef({visual : false, audio: false});

  const [isVisible, setIsVisible] = useState(true);
  const [reps, setReps] = useState(0);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);
  const totalReps = 20;
  const intervalRef = useRef(null)
  

  const restartGame = () => {
    setGameStarted(false);
    setStimuliHistory([]);
    setCurrentStimulus(null);
    setScore({correct: 0, incorrect: 0});
    setResponseGiven({visual: false, audio: false});
    setIsVisible(true);
    setReps(0);
    setShakeIncorrect(false);
  };

  const startGame = () => {
    setGameStarted(true);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'a') {
        handleResponse('visual');
      } else if (e.key.toLowerCase() === 'l') {
        handleResponse('audio');
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStimulus, responseGiven, isVisible, stimuliHistory]);


 
  // Setup the interval to run the cycle every 2 seconds
  useEffect(() => {
    const runCycle = () => {
        // Generate next stimulus
        const newStimulus = generateRandomStimulus();
        setCurrentStimulus(newStimulus);
        currentStimulusRef.current = newStimulus;
        stimuliHistoryRef.current = [...stimuliHistoryRef.current, newStimulus];
        setStimuliHistory(stimuliHistoryRef.current);

        setIsVisible(true);
        setResponseGiven({ visual: false, audio: false });
        responseGivenRef.current = { visual: false, audio: false };
        setReps((prev) => prev + 1);
        console.log("stimuli history: ",stimuliHistoryRef.current)
    
        // Check for missed match (user didn't respond in time)
        if (currentStimulusRef.current && stimuliHistoryRef.current.length >= n) {
            const result = isMatchNBack(currentStimulusRef.current, stimuliHistoryRef.current, n);
      
            let missedCount = 0;
            if (result.visual && !responseGivenRef.current.visual) missedCount += 1;
            if (result.audio && !responseGivenRef.current.audio) missedCount += 1;
            
            if (missedCount > 0) {
              console.log("missed count")
              setScore((prev) => ({
                ...prev,
                incorrect: prev.incorrect + missedCount,
              }));
              setShakeIncorrect(true); 
              setTimeout(() => setShakeIncorrect(false), 500); 
            }
          }
        // Hide the stimulus after a timeout
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      };
    
    if (gameStarted){
    intervalRef.current = setInterval(runCycle, 2000); // 2 seconds per cycle
    }
    // Cleanup the interval on unmount or when reps exceed totalReps
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [gameStarted]); // This useEffect runs only once on mount

  useEffect(() =>
    {if (reps >= totalReps){
        clearInterval(intervalRef.current);
    }}, [reps]);

  const handleResponse = (type) => {
    if (!currentStimulus || responseGiven[type] || !isVisible) return;
  
    const result = isMatchNBack(currentStimulus, stimuliHistory, n);
    const isCorrect = result[type];
    console.log("Stimuli history in response: " , stimuliHistory)
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));

    if (!isCorrect) {
        setShakeIncorrect(true); 
        setTimeout(() => setShakeIncorrect(false), 500); 
    }
  
    responseGivenRef.current[type] = true; 
    setResponseGiven((prev) => ({ ...prev, [type]: true }));
    };

  return (
    <div className="dnb-container flex flex-col items-center gap-4 mt-6">
      <h1 className="text-3xl font-bold ">Fusion Quest ({n}-Back)</h1>
      {!gameStarted ? 
      (<button className="start-button" onClick = {() => startGame()}>Start Game</button>)
      : 
      (
      <div className="flex flex-col items-center gap-4 mt-6">
        <Grid
        position={currentStimulus?.position}
        icon={currentStimulus?.icon}
        isVisible={isVisible}
      />
      <AudioPlayer sound={currentStimulus?.sound} play={isVisible} />

      <div className="flex gap-4">
        <button
          onClick={() => handleResponse('visual')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          🐚 Position Match (Press A)
        </button>
        <button
          onClick={() => handleResponse('audio')}
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
        >
          🎵 Sound Match (Press L)
        </button>
      </div>

      <RepDisplay reps = {reps} totalReps = {totalReps}/>
      <ScoreDisplay score={score} shake = {shakeIncorrect} />
      <button
        onClick={() => restartGame()}
        className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 m-4"
      >
        Restart Game
      </button>
      </div>
    )}
      
    </div>
  );
};

export default DualNBackGame;

