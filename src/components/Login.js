import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box border-2 max-w-80  justify-center">
        <h2 className="mb-3 text-red-400 font-bold text-xl ">Login</h2>

        {error && <alert variant="danger">{error}</alert>}

        <form onSubmit={handleSubmit}>                
            <input
            className="m-4 p-4 border-2"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
         
            <input
            className="m-4 p-4 border-2"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />   

          <div className="d-grid gap-2">
            <button className="bg-red-200 font-bold w-40 m-4 p-3 rounded-md" variant="primary" type="Submit">
              Log In
            </button>
          </div>
        </form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center bg-slate-200 max-w-80 font-medium">
        Don't have an account? <Link to="/signup" className="underline">Sign up</Link>
      </div>
    </>
  );
};

export default Login;