import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../fireBaseConfig";

function Navbar({ onlogout, isAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onlogout();
      navigate("/");
    } catch (error) {
      console.error("Error Signing out", error);
    }
  };

  return (
    <div className="nav-container">
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/questions">Practice</a>
        </li>
        <li>
          <a href="/startquiz">Start Quiz</a>
        </li>
        <li>
          <a href="/support">Support</a>
        </li>
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
