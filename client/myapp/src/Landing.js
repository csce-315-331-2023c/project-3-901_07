import React from 'react';
import shareTeaLogo from './assets/images/190719_Sharetea+logo_白.png';
import './Landing.css';
function Landing() {
  return (
    <div className="App">
        <div className='Nav-Bar'>
                <nav>
            <div className="nav-wrapper">
                <div className="nav-wrapper-left-section">
                <ul>
                    <li><button className = "signin-button">Accessibility</button></li>
                </ul>
                </div>
                <div className="nav-wrapper-right-section">
                <ul>
                    <li><button className = "signin-button">Employee Sign In</button></li>
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
            <button className='Startup'>Start Order</button>
            <button className='Startup'>Menu Board</button>
        
        </div>
        
      </header>
    </div>
  );
}

export default Landing;