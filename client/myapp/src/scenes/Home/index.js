import "./styles.css";
import React, { useState } from "react";
import NavBar from '../components/navbar';
import LeftPanel from './components/leftpanel';
import DrinkPanel from './components/drinkpanel';
import DrinkModal from './components/drinkmodal';

function Home() {
  
  const [isClicked, setIsClicked] = useState("test");
  const [modal, setModal] = useState(false);

  //modal
  const toggleModal = () => {
    console.log("toggle modal");
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  //category clicked
  function handleLinkClick(categoryPressed) {
    // Code to execute when the link is clicked
    console.log(categoryPressed);
    setIsClicked(categoryPressed);
  }
  
  
  

  return (

    <div className = "box">
        <NavBar />
        <div className = "row content">
            <LeftPanel isClicked={isClicked} handleLinkClick={handleLinkClick} />
            <span className = "panel-divider"></span>
            <DrinkPanel isClicked={isClicked} handleLinkClick={handleLinkClick} toggleModal={toggleModal}/>
        </div>

         {modal && <DrinkModal toggleModal={toggleModal} />}
    </div>

  );
}

export default Home;
