import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';

const CustomGallery = ({ images = [], thumbnail = null,slug }) => {
  const allImages = thumbnail ? [{ image: thumbnail }, ...images] : images;

  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay:true,
    autoplaySpeed:3000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  };

    return (
      <Box className='gallerySlider'>
       <Slider
          {...sliderSettings}
          infinite={allImages.length > 1}
        >
          {allImages.map((imgObj, idx) => (
            <Box key={idx} className='gallerySlide'>
              <img
                src={`${process.env.REACT_APP_IMG_URL}${imgObj.image}`}
                alt={`Slide ${idx}`}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    );
};

export default CustomGallery;
