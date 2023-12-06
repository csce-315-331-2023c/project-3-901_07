import "./styles.css";
import React, { useState } from "react";
import Home from './scenes/Home/index.js';
import NavBar from './scenes/components/navbar';
import SignInModal from "./scenes/components/signinmodal";
import LandingNav from "./scenes/Home/components/LandingNav/index.js";


/**
 * Main App component.
 * @param {string} currView - Current view state.
 * @param {function} setCurrView - Function to set the current view state.
 * @returns {JSX.Element} App component
 */
function App({currView, setCurrView}) {
    /**
   * State to manage the visibility of the sign-in modal.
   * @type {[boolean, function]} - [signInModal, setSignInModal]
   */
  const [signInModal, setSignInModal] = useState(false);

    /**
   * Toggles the sign-in modal visibility.
   */
  const toggleSignInModal = () => {
    console.log("toggle modal");
    setSignInModal(!signInModal);
  };

    // Toggle body class based on modal visibility
  if(signInModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  

  return (
    <div className = "box">

      <Home webServerAddress={process.env.REACT_APP_WEB_SERVER_ADDRESS} currView={currView} setCurrView={setCurrView}/>
      {signInModal && <SignInModal toggleModal={toggleSignInModal} />}
    </div>
  );
}

export default App;
