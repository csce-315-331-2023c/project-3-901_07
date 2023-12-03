import "./styles.css";
import React, { useState } from "react";
import shareTeaLogo from "../../../assets/images/sharetealogo.png";

function NavBar({webServerAddress}) {

  const redirectToGoogleOAuth = () => {
    // Redirect to Google OAuth page
    window.location.href = webServerAddress + "/auth/google";
  };

  return (
    <nav>
      <div id="circle">
      <img className="logo" src={shareTeaLogo} alt="Share Tea Logo" />
      </div>
      <div className="nav-wrapper">
        <div className="nav-wrapper-left-section">
          <ul>
            <li><button className = "signin-button">Accessibility</button></li>
          </ul>
        </div>
        <div className="nav-wrapper-right-section">
          <ul>
            <li><button onClick={redirectToGoogleOAuth} className = "signin-button">Employee Sign In</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;