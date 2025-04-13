import React from 'react';
import "../styles/Dashboard.css"

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


const ScoreCard = ({ title, scores, isSongMode = false, showPercentage = true }) => {
    if (!scores || scores.length === 0) {
      return (
        <div className="bg-white/80 rounded-2xl shadow-xl p-4 w-full max-w-xs min-h-[260px] flex flex-col justify-between">
          <h2 className="text-center font-bold text-sm text-gray-800 tracking-wide mb-3">
            {title}
          </h2>
          <p className="flex-grow flex items-center justify-center text-sm text-gray-600">No scores yet. Play some games!</p>
        </div>
      );
    }
  
    // Get highest score per unique difficulty/song name
    const bestPerDifficulty = {};
  
    scores
    .forEach(entry => {
      const key = entry.difficulty || 'Unknown';
      if (!bestPerDifficulty[key] || entry.score > bestPerDifficulty[key].score) {
        bestPerDifficulty[key] = entry;
      }
    });
  
    const sortedScores = Object.values(bestPerDifficulty).sort((a, b) =>
      (a.difficulty || '').localeCompare(b.difficulty || '')
    );
  
    const overallBest = sortedScores.reduce((max, entry) =>
      entry.score > max.score ? entry : max
    , sortedScores[0]);
  
    return (
      <div className="bg-white/80 rounded-2xl shadow-xl p-4 w-full max-w-xs min-h-[260px]">
        <h2 className="text-center font-bold text-sm text-gray-800 tracking-wide mb-3">
          {title}
        </h2>
  
        <div className="mb-3 text-center text-xs text-green-700 font-semibold">
          🏆 Highest Score: {overallBest.score}
          {showPercentage && typeof overallBest.score === 'number' && overallBest.score > 1 ? '%' : ''}
        </div>
  
        <ul className="space-y-2">
          {sortedScores.map((entry, index) => (
            <li key={index} className="text-xs text-gray-800">
              <div className="flex justify-between font-semibold">
                <span>
                  {isSongMode ? entry.difficulty || 'Untitled Song' : entry.difficulty || '-'}
                </span>
                <span>
                  {entry.score}
                  {showPercentage && typeof entry.score === 'number' && entry.score > 1 ? '%' : ''}
                </span>
              </div>
              <div className="text-[11px] text-gray-500 text-right">
                {formatDate(entry.timestamp)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

const Dashboard = ({ userData }) => {
  console.log("userData", userData)
  const scores = userData?.scores || {};
  console.log("scores: ", scores)

  const getScores = (game, subMode = null) => {
    if (subMode) {
      return scores[game]?.[subMode] || [];
    }
    return scores[game] || [];
  };

  return (
    <div className="dashboard-container min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ScoreCard
          title="Sound Quest - Freeplay"
          scores={getScores('SoundQuest', 'Freeplay')}
          isSongMode={true}
        />
        <ScoreCard
          title="Sound Quest - Challenge"
          scores={getScores('SoundQuest', 'Challenge')}
          showPercentage ={false}
        />
        <ScoreCard
          title="Visual Quest"
          scores={getScores('VisualQuest')}
          showPercentage={false}
        />
        <ScoreCard
          title="Fusion Quest"
          scores={getScores('FusionQuest')}
        />
      </div>
    </div>
  );
};

export default Dashboard;
