import { Box, IconButton } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StoreCard from "../StoreCard/StoreCard";

function Carousel({ stores = [] }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <Box className="carousel store-cards mt-5">
      <Slider
        {...settings}
        className={stores.length <= 2 ? "slider-start" : ""}
      >
        {stores &&
          stores
            .filter(
              (store) =>
                store.status === "active" && store.is_active_by_admin == 1,
            )
            .map((singleStore) => {
              return (
                  <StoreCard storeDetails={singleStore} />
              );
            })}
      </Slider>
    </Box>
  );
}

export default Carousel;

const PrevArrow = ({ className, style, onClick }) => (
  <IconButton className="arrow-prev-custom custom-arrow" onClick={onClick}>
    <ArrowForwardIosIcon />
  </IconButton>
);

const NextArrow = ({ className, style, onClick }) => (
  <IconButton className="arrow-next-custom custom-arrow" onClick={onClick}>
    <ArrowForwardIosIcon />
  </IconButton>
);
