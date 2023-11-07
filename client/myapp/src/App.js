import "./styles.css";
import React, { useState } from "react";
import Home from './scenes/Home/index.js';
import NavBar from './scenes/components/navbar';
import SignInModal from "./scenes/components/signinmodal";

function App() {
  const [signInModal, setSignInModal] = useState(false);

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
      <NavBar toggleSignInModal={toggleSignInModal} />
      <Home webServerAddress={process.env.REACT_APP_WEB_SERVER_ADDRESS}/>
      {signInModal && <SignInModal toggleModal={toggleSignInModal} />}
    </div>
  );
}

export default App;
