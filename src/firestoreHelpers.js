import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export const saveScore = async (userId, gameMode, difficulty, score, subMode) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    const fieldPath = subMode
    ? `scores.${gameMode}.${subMode}`
    : `scores.${gameMode}`;

    // If user doc doesn't exist, create it first
    if (!userSnap.exists()) {
        const scoreEntry = {
          score,
          difficulty,
          timestamp: new Date().toISOString(),
        };
      
        const scoreData = subMode
          ? {
              scores: {
                [gameMode]: {
                  [subMode]: [scoreEntry],
                },
              },
            }
          : {
              scores: {
                [gameMode]: [scoreEntry],
              },
            };
      
        await setDoc(userRef, scoreData);
      } else {
      // If user doc exists, update it
      await updateDoc(userRef, {
        [fieldPath]: arrayUnion({
          score,
          difficulty,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    console.log("Score saved successfully!");
  } catch (error) {
    console.error("Error saving score: ", error);
  }
};
