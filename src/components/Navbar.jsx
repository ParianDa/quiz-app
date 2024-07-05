import React from "react";

function Navbar() {
    return(
        <div className="nav-container">
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/questions">Practice</a></li>
                <li><a href="/startquiz">Start Quiz</a></li>
                <li><a href="/support">Support</a></li>
                <li><a href="">Logout</a></li>
            </ul>
        </div>
    )
}

export default Navbar;