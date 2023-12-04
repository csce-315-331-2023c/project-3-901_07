import React from 'react';
import ImageCarousel from '../components/carousel';
import Footer from '../components/footer';
import NavigationBar from '../components/LandingNav';
import './styles.css';

function Landing() {
  
    

  const redirectToGoogleOAuth = () => {
    window.location.href = process.env.REACT_APP_WEB_SERVER_ADDRESS + '/auth/google';
  };

  return (
    <div className="Landing">
      <NavigationBar />
      <ImageCarousel />
      <div className="about-us">
        <h4>About Us</h4>
        <p>
          r. Cheng Kai-Lung, the founder of Sharetea, was working in the film and TV industry as a director in 1992...
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
