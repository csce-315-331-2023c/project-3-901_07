import "./styles.css";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import shareTeaLogo from "../../../../assets/images/logo.png";
const NavigationBar = () => {
    const navigate = useNavigate();

  const handleButtonClick = (index) =>{
    switch(index){
        case 0:
            navigate('');
        case 1:
            navigate('/App');
        case 2:
            navigate('/App');
        case 3:
            navigate('/Menu');
    }
  }

  const buttons = ['Home', 'New', 'Locations', 'Menu'];

  return (
    <div className="nav-wrapper">
            <img className="landing-logo" src={shareTeaLogo}/>
            <div className="navigation-bar">
        {buttons.map((button, index) => (
            <div
            key={index}
            className="nav-button" 
            onClick={() => handleButtonClick(index)}
            >
            {button}
            </div>
        ))}
        </div>
        <button className="sign-in">Sign In</button>
    </div>
    
  );
};

export default NavigationBar;