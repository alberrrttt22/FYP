import React from "react";
import {auth} from '../firebase.js'
import '../styles/Login.css'
import {signInWithGoogle, initializeUserDataIfNeeded} from '../auth.js'
import {useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen">
      <Helmet>
      <link rel="preload" href="/images/background-page-one.jpg" as="image" />
      </Helmet>
      <div className="login-container bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">

      <h1 className="text-2xl font-bold mb-4">Welcome to Memory Quest!</h1>
      <p>Memory games for young explorers</p>
      <br/>
      <button
        onClick={async () => {
            const user = await signInWithGoogle();
            await initializeUserDataIfNeeded(user.uid);
            if (user){
                navigate("/Dashboard");
            }
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
      >
        Sign in with Google
      </button>
    </div>

    </div>
  );
};

export default Login;
