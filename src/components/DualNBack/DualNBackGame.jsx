import React, { useEffect, useState, useRef } from 'react';
import Grid from './Grid';
import AudioPlayer from './AudioPlayer.jsx';
import { generateRandomStimulus, isMatchNBack } from './StimulusController';
import ScoreDisplay from './ScoreDisplay';
import RepDisplay from './RepDisplay.jsx';

const DualNBackGame = ({ n }) => {
  const currentStimulusRef = useRef(null);
  const responseGivenRef = useRef({visual : false, audio: false});
  const [stimuliHistory, setStimuliHistory] = useState([]);
  const [currentStimulus, setCurrentStimulus] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [responseGiven, setResponseGiven] = useState({ visual: false, audio: false });
  const [isVisible, setIsVisible] = useState(true);
  const [reps, setReps] = useState(0);
  const [shakeIncorrect, setShakeIncorrect] = useState(false);
  const totalReps = 20;
  const intervalRef = useRef(null)

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


  useEffect(() => {
    let timeout;

    const runCycle = () => {
        // Check for missed match (user didn't respond in time)
        if (
            currentStimulusRef.current &&
            stimuliHistory.length >= n
          ) {
            const result = isMatchNBack(currentStimulusRef.current, stimuliHistory, n);
            
            let missedCount = 0;
            if (result.visual && !responseGivenRef.current.visual) missedCount += 1;
            if (result.audio && !responseGivenRef.current.audio) missedCount += 1;
            
            console.log('Missed check', {
                result: isMatchNBack(currentStimulusRef.current, stimuliHistory, n),
                responded: responseGivenRef.current
            });
            if (missedCount > 0) {
              setScore((prev) => ({
                ...prev,
                incorrect: prev.incorrect + missedCount,
              }));
            }
          }
      
        // Generate next stimulus
        const newStimulus = generateRandomStimulus();
        setCurrentStimulus(newStimulus);
        currentStimulusRef.current = newStimulus;
        setStimuliHistory((prev) => [...prev, newStimulus]);
        setIsVisible(true);
        setResponseGiven({ visual: false, audio: false });
        responseGivenRef.current = { visual: false, audio: false };
        setReps((prev) => prev + 1);
      
        timeout = setTimeout(() => {
            setIsVisible(false);
        }, 1000);
        };

    runCycle(); // start first round
    intervalRef.current = setInterval(runCycle, 2000); 
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() =>
    {if (reps >= totalReps){
        clearInterval(intervalRef.current);
    }}, [reps]);

  const handleResponse = (type) => {
    if (!currentStimulus || responseGiven[type] || !isVisible) return;
  
    const result = isMatchNBack(currentStimulus, stimuliHistory, n);
    const isCorrect = result[type];
  
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
    <div className="flex flex-col items-center gap-4 mt-6">
      <h1 className="text-3xl font-bold ">Fusion Quest ({n}-Back)</h1>

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
          🐚 Position Match
        </button>
        <button
          onClick={() => handleResponse('audio')}
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
        >
          🎵 Sound Match
        </button>
      </div>

      <RepDisplay reps = {reps} totalReps = {totalReps}/>
      <ScoreDisplay score={score} shake = {shakeIncorrect} />
    </div>
  );
};

export default DualNBackGame;

