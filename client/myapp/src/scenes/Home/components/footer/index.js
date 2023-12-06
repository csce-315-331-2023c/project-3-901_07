import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import logo from "../../../../assets/images/logo.png";
import './styles.css';



/**
 * Footer component displaying contact information and social links.
 * @returns {JSX.Element} Footer component JSX.
 */
const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="logo2">
            <img src={logo} className="logoImg" alt="Logo" />
          </div>
          <div className="socialContainer">
            <div className="socialLink">
              <a href="tel:512-838-6752">
                <div className="iconWrapper">
                  <FontAwesomeIcon icon={faPhone} className="socialIcon" />
                </div>
              </a>
            </div>
            <div className="socialLink">
              <a href="mailto:info@shareteahouston.com">
                <div className="iconWrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="socialIcon" />
                </div>
              </a>
            </div>
            <div className="socialLink">
              <a href="https://www.facebook.com/shareteahouston">
                <div className="iconWrapper">
                  <FontAwesomeIcon icon={faFacebook} className="socialIcon" />
                </div>
              </a>
            </div>
            <div className="socialLink">
              <a href="https://twitter.com/shareteahouston">
                <div className="iconWrapper">
                  <FontAwesomeIcon icon={faTwitter} className="socialIcon" />
                </div>
              </a>
            </div>
            <div className="socialLink">
              <a href="https://instagram.com/shareteahouston/">
                <div className="iconWrapper">
                  <FontAwesomeIcon icon={faInstagram} className="socialIcon" />
                </div>
              </a>
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
  


