import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import shareTeaLogo from "../../../../assets/images/logo.png"; // Update the path accordingly
import './styles.css'; // You can create this file for custom styles

const images = [
  { src: shareTeaLogo, caption: 'this is boba' },
  { src: shareTeaLogo, caption: 'this is ice' },
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
            <div className="caption">{image.caption}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
