import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import cookie from "../../../../assets/images/Carousel/cookie.png";
import earl from "../../../../assets/images/Carousel/earl grey.jpg";
import fluffy from "../../../../assets/images/Carousel/fluffy.jpg";
import './styles.css'; // You can create this file for custom styles

const images = [
  { src: cookie},
  { src: earl},
  {src: fluffy},
  
  // Add more images as needed
];

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Add this property for automatic sliding
    autoplaySpeed: 5000, // Adjust the interval in milliseconds (e.g., 3000ms = 3 seconds)
  };

  return (
    <div className="image-carousel">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image.src} alt={`slide ${index + 1}`} />
            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
