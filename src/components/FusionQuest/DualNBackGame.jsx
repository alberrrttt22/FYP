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
  const stimuliHistoryRef = useRef([]); //Ref

  const [currentStimulus, setCurrentStimulus] = useState(null);
  const currentStimulusRef = useRef(null); //Ref

  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const [responseGiven, setResponseGiven] = useState({ visual: false, audio: false });
  const responseGivenRef = useRef({visual : false, audio: false}); //Ref

  const [isVisible, setIsVisible] = useState(true);
  const [reps, setReps] = useState(0);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);
  const totalReps = 25;
  const intervalRef = useRef(null) //Ref
  const [gameOver, setGameOver] = useState(false);

  const restartGame = () => {
    setGameStarted(false);
    setStimuliHistory([]);
    stimuliHistoryRef.current = []
    setCurrentStimulus(null);
    currentStimulusRef.current = null;
    setScore({correct: 0, incorrect: 0});
    setResponseGiven({visual: false, audio: false});
    responseGivenRef.current = {visual : false, audio : false};
    setIsVisible(true);
    setReps(0);
    setShakeIncorrect(false);
    setGameOver(false);
  };

  // Same as restartGame() but GameStarted is set to true and runs the first cycle
  const startGame = () => {
    setGameStarted(true);
    setStimuliHistory([]);
    stimuliHistoryRef.current = []
    setCurrentStimulus(null);
    currentStimulusRef.current = null;
    setScore({correct: 0, incorrect: 0});
    setResponseGiven({visual: false, audio: false});
    responseGivenRef.current = {visual : false, audio : false};
    setIsVisible(true);
    setReps(0);
    setShakeIncorrect(false);
    setGameOver(false);
  }

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
    

    // Check for missed match (user didn't respond in time)
    if (currentStimulusRef.current && stimuliHistoryRef.current.length > n) {
        setTimeout(() => {
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
      }, 1900);
    }
    // Hide the stimulus after a timeout
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };



   // Setup the interval to run the cycle every 2 seconds
   useEffect(() => {
    if (gameStarted){
      runCycle();
      intervalRef.current = setInterval(runCycle, 2000); // 2 seconds per cycle
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [gameStarted]); 

  
  // Logic to show the summary screen after the game
  useEffect(() =>
    {if (reps >= totalReps){
        clearInterval(intervalRef.current);
        const gameOverTimeout = setTimeout(() => {setGameOver(true)}, 2000);
        return () => { clearTimeout(gameOverTimeout); }
    }}, [reps]);

    

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
  }, [currentStimulus, responseGiven, stimuliHistory]);


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
    !gameOver ? 
      (<div className="dnb-container flex flex-col items-center gap-4 mt-6">
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
    </div>) : 
    (<div className='summary'>
      <h1 className= "text-2xl">Your Score:</h1>
      <div className="text-2xl">{(((score.correct)/(score.correct + score.incorrect)) * 100).toFixed(1)}%</div>
      <ScoreDisplay score={score} shake = {shakeIncorrect} />
      <button className = "start-button" onClick ={() => restartGame()}>Play Again?</button>
    </div>)
    )
};

export default DualNBackGame;

