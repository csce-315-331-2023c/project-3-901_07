import "./styles.css";
import React, { useEffect, useState } from "react";
import shareTeaLogo from "../../../assets/images/sharetealogo.png";

function NavBar({webServerAddress}) {

  const [userName, setUserName] = useState(null);
  const [userID, setuserID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(webServerAddress + "/success", {
          mode: "cors",
        });
        const data = await response.json();
        const fetchedUserName = data['displayName'];
        setUserName(fetchedUserName);
        setuserID(data['id']);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, [webServerAddress]);
  
  const handleSignOut = async () => {
    window.location.href = webServerAddress + "/logout";
  };

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
          {userName ? (
              <li>
                <button onClick={handleSignOut} className="signin-button">
                  Sign Out ({userName})
                </button>
              </li>
            ) : (
              <li>
                <button onClick={redirectToGoogleOAuth} className="signin-button">
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;