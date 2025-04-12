import { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import '../styles/Dashboard.css'

const GAME_MODES = ["Visual Quest", "Sound Quest", "Fusion Quest"];
const SUBMODES = {
  "Sound Quest": ["freeplay", "challenge"],
};

export default function Dashboard({ userId }) {
  const [scores, setScores] = useState({});

  useEffect(() => {
    if (!userId) return;
  
    async function fetchScores() {
      try {
        const userRef = doc(db, "users", userId);
        const scoresRef = collection(userRef, "scores");
        const scoresSnapshot = await getDocs(scoresRef);
  
        const allScores = {};
  
        for (const modeDoc of scoresSnapshot.docs) {
          const mode = modeDoc.id;
  
          if (SUBMODES[mode]) {
            allScores[mode] = {};
  
            for (const submode of SUBMODES[mode]) {
              const q = query(
                collection(db, "users", userId, "scores", mode, submode),
                orderBy("timestamp", "desc")
              );
              const subSnap = await getDocs(q);
              const subScores = subSnap.docs.map((doc) => doc.data());
  
              allScores[mode][submode] = subScores;
            }
          } else {
            const q = query(
              collection(db, "users", userId, "scores", mode),
              orderBy("timestamp", "desc")
            );
            const snap = await getDocs(q);
            const modeScores = snap.docs.map((doc) => doc.data());
  
            allScores[mode] = modeScores;
          }
        }
  
        setScores(allScores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    }
  
    fetchScores();
  }, [userId]);
  

  const getHighScore = (scoreList) =>
    scoreList.length ? Math.max(...scoreList.map((s) => s.score)) : "-";

  const renderScores = (scoreList) =>
    scoreList.slice(0, 5).map((s, index) => (
      <div key={index} className="text-sm flex justify-between text-muted-foreground">
        <span>
          {s.difficulty} - {new Date(s.timestamp?.seconds * 1000).toLocaleString()}
        </span>
        <span className="font-semibold">{s.score}</span>
      </div>
    ));

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {GAME_MODES.map((mode) => {
        const isSubmode = SUBMODES[mode];

        if (isSubmode) {
          return SUBMODES[mode].map((sub) => {
            const data = scores[mode]?.[sub] || [];

            return (
                <div>
                
                  <h2 className="text-xl font-bold mb-2">{mode} - {sub}</h2>
                  <p className="text-md mb-2">High Score: {getHighScore(data)}</p>
                  <div className="space-y-1">{renderScores(data)}</div>
                </div>
            );
          });
        } else {
          const data = scores[mode] || [];

          return (
            <div>
                <h2 className="text-xl font-bold mb-2">{mode}</h2>
                <p className="text-md mb-2">High Score: {getHighScore(data)}</p>
                <div className="space-y-1">{renderScores(data)}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
