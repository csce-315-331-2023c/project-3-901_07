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
        <div className="social">
            <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faPhone} className="socialIcon" />
            </a>
            <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faEnvelope} className="socialIcon" />
            </a>
            <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faFacebook} className="socialIcon" />
            </a>
            <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faTwitter} className="socialIcon" />
            </a>
            <a href="#" className="socialLink">
            <FontAwesomeIcon icon={faInstagram} className="socialIcon" />
            </a>
        </div>
      </div>
      <div className="bottomBar">
        <p>&copy; 2023 ShareTea. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
