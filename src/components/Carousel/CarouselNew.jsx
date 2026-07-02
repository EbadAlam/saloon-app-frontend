import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { ROUTES } from "../../routes";

function Carousel({ stores = [] }) {
  const calculateAverageRating = (reviews = []) => {
    const total = reviews.reduce(
      (sum, r) => sum + parseFloat(r.rating || 0),
      0,
    );
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  };
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };
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
              const averageRating = calculateAverageRating(singleStore.reviews);
              return (
                <Link
                  style={{ display: "block" }}
                  to={ROUTES.getStoreFrontPage(singleStore.slug)}
                >
                  <div className="store-card">
                    <div className="store-img">
                       {!loadedImages[singleStore.id] && (
                        <Box className="image-loader">
                          <CircularProgress color="white" />
                        </Box>
                      )}
                      <img
                        src={`${process.env.REACT_APP_IMG_URL}${singleStore.thumbnail}`}
                        alt=""
                        onLoad={() => handleImageLoad(singleStore.id)}
                        onError={() => handleImageLoad(singleStore.id)}
                      />
                    </div>
                    <div className="store-info">
                      <div className="store-title">
                        <h3>{singleStore.title}</h3>
                      </div>
                      <div className="store-address">
                        <LocationOnOutlinedIcon />
                        <p>{singleStore.address}</p>
                      </div>
                      <div className="rating-reviews">
                        <div className="rating">
                          <StarIcon />
                          <span>{averageRating}</span>
                        </div>
                        <div className="reviews">
                          <p>({singleStore.reviews.length == 1 ? `${singleStore.reviews.length} Review` : `${singleStore.reviews.length} Reviews`})</p>
                        </div>
                      </div>
                      <hr className="divider" />
                      <div className="card-footer">
                        <div className="start-from">
                          <p>
                            starting from <br />
                            <span>PKR 50</span>
                          </p>
                        </div>
                        <div className="book-now">
                          <Link to={ROUTES.getBookingPage(singleStore.slug)}>
                            <button>Book Now</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
