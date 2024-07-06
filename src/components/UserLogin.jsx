import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBaseConfig";

export default function UserLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  async function doUserLogin(event) {
    event.preventDefault();
    const usernameValue = username;
    const passwordValue = password;

    if(!validateEmail(usernameValue)) {
        alert("Please enter a valid email address.");
        return;
    }
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        usernameValue,
        passwordValue
      );
      navigate("/about");
      alert(`Success, username ${loggedInUser.email}, has logged !`);

      setUsername("");
      setPassword("");
      onLogin();
      return true;
    } catch (error) {
      console.log("error Login in", error);
      return false;
    }
  }

  return (
    <div>
      <div className="login-logo">
        <h2>Quiz App Login</h2>
      </div>
      {currentUser === null && (
        <div className="login-container">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          <button onClick={doUserLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
