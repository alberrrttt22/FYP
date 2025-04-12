import '../styles/Dashboard.css';
export default function DashboardPlaceholder() {
  const songOrder = [
    "Mary Had a Little Lamb",
    "Twinkle Twinkle Little Star",
    "Ode to Joy",
    "Happy Birthday",
    "Jingle Bells",
  ];

  const placeholderData = {
    "Visual Quest": [
      { difficulty: "Easy", score: 25, timestamp: "2025-04-10 14:33" },
      { difficulty: "Medium", score: 35, timestamp: "2025-04-09 18:00" },
      { difficulty: "Hard", score: 32, timestamp: "2025-04-08 16:18" },
    ],
    "Sound Quest": {
      freeplay: {
        "Mary Had a Little Lamb": { difficulty: "Easy", score: 70, timestamp: "2025-04-10 13:48" },
        "Twinkle Twinkle Little Star": { difficulty: "Medium", score: "-", timestamp: "-" },
        "Ode to Joy": { difficulty: "Medium", score: 60, timestamp: "2025-04-08 14:24" },
        "Happy Birthday": { difficulty: "Easy", score: 55, timestamp: "2025-04-07 11:10" },
        "Jingle Bells": { difficulty: "Medium", score: "-", timestamp: "-" },
      },
      challenge: [
        { difficulty: "Easy", score: 10, timestamp: "2025-04-10 16:02" },
        { difficulty: "Genius", score: 5, timestamp: "2025-04-09 17:10" }
      ],
    },
    "Fusion Quest": [
      { difficulty: "Easy", score: 80, timestamp: "2025-04-08 09:01" },
      { difficulty: "Medium", score: 92, timestamp: "2025-04-09 09:42" },
      { difficulty: "Hard", score: 87, timestamp: "2025-04-10 10:03" },
    ],
  };

  const difficultyOrder = ["Easy", "Medium", "Hard", "Genius"];

  const getHighScore = (scores) =>
    scores
      .filter((s) => typeof s.score === "number")
      .reduce((max, s) => (s.score > max ? s.score : max), 0);

  const renderSortedScores = (scores, isPercentage = false) => {
    const sorted = [...scores].sort(
      (a, b) => difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty)
    );

    return sorted.map((s, idx) => (
      <div key={idx} className="text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>{s.difficulty}</span>
          <span>{typeof s.score === "number" ? `${s.score}${isPercentage ? "%" : ""}` : "-"}</span>
        </div>
        {s.timestamp && s.timestamp !== "-" && (
          <div className="text-xs text-gray-400 mt-0.5">{s.timestamp}</div>
        )}
      </div>
    ));
  };

  const renderFreeplay = (freeplayData) =>
    songOrder.map((song, idx) => {
      const s = freeplayData[song];
      const scoreText = s?.score === "-" || s?.score === undefined ? "-" : `${s.score}%`;
      const timeText = s?.timestamp && s?.timestamp !== "-" ? s.timestamp : null;

      return (
        <div key={idx} className="text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span className="max-w-[60%] truncate">{song}</span>
            <span>{scoreText}</span>
          </div>
          {timeText && (
            <div className="text-xs text-gray-400 mt-0.5">{timeText}</div>
          )}
        </div>
      );
    });

  const renderCard = (title, content, isFreeplay = false, isPercentage = false) => {
    const highScore = isFreeplay
      ? Math.max(
          ...Object.values(content)
            .filter((v) => typeof v.score === "number")
            .map((v) => v.score)
        )
      : getHighScore(content);

    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-6 w-full max-w-sm space-y-4 min-h-[320px] flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm font-semibold w-fit mb-4">
            High Score: {highScore > 0 ? `${highScore}${isPercentage ? "%" : ""}` : "-"}
          </div>
          <div className="space-y-2">
            {isFreeplay
              ? renderFreeplay(content)
              : renderSortedScores(content, isPercentage)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {renderCard(
          "Sound Quest - Freeplay",
          placeholderData["Sound Quest"].freeplay,
          true,
          true
        )}
        {renderCard(
          "Sound Quest - Challenge",
          placeholderData["Sound Quest"].challenge
        )}
        {renderCard("Visual Quest", placeholderData["Visual Quest"])}
        {renderCard(
          "Fusion Quest",
          placeholderData["Fusion Quest"],
          false,
          true
        )}
      </div>
      <button
          
          className="font-bold absolute top-1 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
        Game Modes
      </button>
      <div className="absolute flex flex-col justify-center items-center bg-opacity-80 top-0 right-30 m-4 bg-white p-2 rounded-2xl shadow-lg">
          <div className="welcome-message text-2xl">{`Welcome, Albert! 👋`}</div>
          <button className ="underline hover:bg-blue-300 sign-out text-sm rounded-xl">Sign out</button>
      </div>
    </div>
  );
}
