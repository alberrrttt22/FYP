import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Dashboard from '../components/Dashboard';
import {useAuth} from "../context/AuthContext";
import {logout} from '../auth.js';
import {Link} from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const firstName = user?.displayName?.split(" ")?.[0] || "friend";

  const handleLogout = async () => {
              try {
                await logout();
                navigate("/");
              } catch (error){
                console.error("Error signing out: ", error);
              }
            };

  useEffect(() => {
    console.log("user at mount:", user); // 🪵 Debug log
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data());
      }
    };
    fetchUser();
  }, [user]);

  return userData ? (
    <div>
    <Dashboard userData={userData} />
    <div className="absolute flex flex-col justify-center items-center bg-opacity-80 top-0 right-0 m-4 pr-1 pl-1 ">
        <div className="welcome-message text-m text-white ">{`Welcome, ${firstName}! 👋`}</div>
        <button className ="underline hover:bg-blue-700 sign-out text-sm rounded-xl text-white" onClick = {handleLogout}>Sign out</button>
    </div>
    <Link
        to="/GameModes"
        className="font-bold absolute top-1 left-0 m-3 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
    >
        Game Modes
    </Link>
    </div>
  ) : (
    <p className="text-white text-center mt-10">Loading...</p>
  );
};

export default DashboardPage;
