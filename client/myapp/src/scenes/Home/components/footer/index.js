import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import logo from "../../../../assets/images/logo.png";
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
      
        <div className="logo2">
        
          <img src={logo}  className="logoImg" />
        </div>
        <div className="socialContainer">
            
            <div className="socialLink">
                <div className="iconWrapper">
                <FontAwesomeIcon icon={faPhone} className="socialIcon" />
                </div>
            </div>
            <div className="socialLink">
                <div className="iconWrapper">
                <FontAwesomeIcon icon={faEnvelope} className="socialIcon" />
                </div>
            </div>
            <div className="socialLink">
                <div className="iconWrapper">
                <FontAwesomeIcon icon={faFacebook} className="socialIcon" />
                </div>
            </div>
            <div className="socialLink">
                <div className="iconWrapper">
                <FontAwesomeIcon icon={faTwitter} className="socialIcon" />
                </div>
            </div>
            <div className="socialLink">
                <div className="iconWrapper">
                <FontAwesomeIcon icon={faInstagram} className="socialIcon" />
                </div>
            </div>
            </div>
      </div>
      <div className="bottomBar">
        <p>&copy; 2023 ShareTea. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
