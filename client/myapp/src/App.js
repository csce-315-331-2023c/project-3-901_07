import "./styles.css";
import React, { useState } from "react";
import Home from './scenes/Home/index.js';
import NavBar from './scenes/components/navbar';
import SignInModal from "./scenes/components/signinmodal";
import LandingNav from "./scenes/Home/components/LandingNav/index.js";

function App() {
  const [signInModal, setSignInModal] = useState(false);
  const [currView, setCurrView] = useState(null);
  //modal
  const toggleSignInModal = () => {
    console.log("toggle modal");
    setSignInModal(!signInModal);
  };

  if(signInModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div className = "box">

      <LandingNav currView={currView} setCurrView={setCurrView} />
      <Home webServerAddress={process.env.REACT_APP_WEB_SERVER_ADDRESS} currView={currView} setCurrView={setCurrView}/>
      {signInModal && <SignInModal toggleModal={toggleSignInModal} />}
    </div>
  );
}

export default App;
