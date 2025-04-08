import React from 'react';
import '../../styles/FusionGame.css'

const ScoreDisplay = ({ score, shake }) => {
  return (
    <div className="text-center mt-4">
      <p className="text-lg font-semibold">✅ Correct: {score.correct}</p>
      <p className={`text-red-600 font-semibold ${shake ? 'animate-shake' : ''}`}>❌ Incorrect: {score.incorrect}</p>
    </div>
  );
};

export default ScoreDisplay;