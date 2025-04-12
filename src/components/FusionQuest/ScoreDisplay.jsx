import React from 'react';
import '../../styles/FusionGame.css'

const ScoreDisplay = ({ score, shake }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4 mt-4">
      <p className="text-lg font-semibold leading-tight">✅ Correct: {score.correct}</p>
      <p className={`text-red-600 font-semibold ${shake ? 'animate-shake' : ''} leading-tight`}>❌ Incorrect: {score.incorrect}</p>
    </div>
  );
};

export default ScoreDisplay;