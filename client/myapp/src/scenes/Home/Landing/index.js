import React from 'react';
import NavigationBar from '../components/LandingNav';
import ImageCarousel from '../components/carousel';
import "./styles.css";

function Landing() {

  
  const redirectToGoogleOAuth = () => {
    // Redirect to Google OAuth page
    window.location.href = process.env.REACT_APP_WEB_SERVER_ADDRESS + "/auth/google";
  };
  

  return (
    <div className="Landing">
       <NavigationBar/>
       <ImageCarousel/>
       <div className='about-us'>
            <h4>About Us</h4>
            <p4>Mr. Cheng Kai-Lung, the founder of Sharetea, was working in the film and TV industry as a director in 1992. Although being a director seems like one of the most glamorous jobs in the world, he was not satisfied yet. He quit his job and started his own tea street vendor business. At first, he encountered many hardships, but instead of giving up, he deeply believed “when you have strong faith, big thing happens”. After all the hard work he put in, Sharetea was adored by the crowd, and that was how the first Sharetea store got started.</p4>
       </div>
    </div>
  );
}

export default Landing;