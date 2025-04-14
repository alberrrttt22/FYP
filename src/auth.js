import { auth } from "./firebase.js";
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Sign-in failed:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const initializeUserDataIfNeeded = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      scores: {
        SoundQuest: {
          Freeplay: [],
          Challenge: []
        },
        VisualQuest: [],
        FusionQuest: []
      }
    });
  } else {
    const data = userSnap.data();
    if (!data.scores) {
      await setDoc(userRef, {
        scores: {
          SoundQuest: {
            Freeplay: [],
            Challenge: []
          },
          VisualQuest: [],
          FusionQuest: []
        }
      }, { merge: true });
    }
  }
};