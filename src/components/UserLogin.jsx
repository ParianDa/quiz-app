import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";

export default function UserLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  async function doUserLogin(event) {
    event.preventDefault();
    const usernameValue = username;
    const passwordValue = password;

    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      navigate("/about");
      alert(`Success, username ${loggedInUser.get("username")}, has logged !`);

      const currentUser = await Parse.User.current();
      console.log(currentUser === loggedInUser);

      setUsername("");
      setPassword("");
      onLogin();
      getCurrentUser();
      return true;
    } catch (error) {
      console.log("error Login in", error);
      return false;
    }
  }

  async function getCurrentUser() {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
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
