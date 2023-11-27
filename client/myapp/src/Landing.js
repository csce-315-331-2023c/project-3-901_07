import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import shareTeaLogo from './assets/images/190719_Sharetea+logo_白.png';
function Landing() {

  const navigate = useNavigate();
  const goApp = () =>{
    navigate('/App');
  };
  const goWeather = () =>{
    navigate('/Weather');
  }
  const redirectToGoogleOAuth = () => {
    // Redirect to Google OAuth page
    window.location.href = process.env.REACT_APP_WEB_SERVER_ADDRESS + "/auth/google";
  };
  

  return (
    <div className="App">
        <div className='Nav-Bar'>
                <nav>
            <div className="nav-wrapper">
                <div className="nav-wrapper-left-section">
                <ul>
                    <li><button onClick = {goWeather} className = "signin-button">Accessibility</button></li>
                </ul>
                </div>
                <div className="nav-wrapper-right-section">
                <ul>
                    <li><button onClick = {redirectToGoogleOAuth} className = "signin-button">Employee Sign In</button></li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
      <header className="App-header">
      
        <div className='log0'>
            <img className="logo1" src={shareTeaLogo} alt="Share Tea Logo" />
        </div>
        <div className='buttons'>
            <button onClick={goApp} className='Startup'>Start Order</button>
            <button className='Startup'>Menu Board</button>
        
        </div>
        
      </header>
    </div>
  );
}

export default Landing;