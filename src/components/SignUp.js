import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserAuth } from "../context/UserAuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box border-2 max-w-80  justify-center">
        <h2 className="mb-3 text-red-400 font-bold text-xl"> Sign Up</h2>
        
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="p-4 box mt-3 text-center bg-slate-200 max-w-80 font-medium">
        Already have an account? <Link to="/" className="underline">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;