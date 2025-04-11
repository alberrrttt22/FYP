import React from "react";
import {auth} from '../firebase.js'
import '../styles/Login.css'
import {signInWithGoogle} from '../auth.js'
import {useNavigate} from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen">
      <div className="login-container bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">

      <h1 className="text-2xl font-bold mb-4">Welcome to Memory Quest!</h1>
      <p>Memory games for young explorers</p>
      <br/>
      <button
        onClick={async () => {
            const user = await signInWithGoogle();
            if (user){
                navigate("/GameModes");
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
