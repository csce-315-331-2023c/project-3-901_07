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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
