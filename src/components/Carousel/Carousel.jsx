import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <Box className="carousel mt-5">
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
                  <Box className="singleSlide" sx={{ marginRight: "25px" }}>
                    <Box
                      className="lsideImg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        overflow: "hidden",
                        // height: "330px",
                        // borderRadius: "10px 10px 0px 0px",
                      }}
                    >
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
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="0px"
                      className="slideInfo"
                      sx={{
                        background: "white",
                        borderRadius: "0px 0px 10px 10px",
                        padding: "15px 0px",
                      }}
                    >
                      <Box
                        className="titleRating"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box className="title">
                          <Typography
                            variant="h4"
                            sx={{
                              fontSize: "18px",
                              fontFamily: "Barlow",
                              fontWeight: "600",
                              textTransform: "capitalize",
                            }}
                          >
                            {singleStore.title}
                          </Typography>
                        </Box>
                        <Box
                          className="rating"
                          display="flex"
                          alignItems="center"
                          gap="3px"
                        >
                          <StarIcon fontSize="small" sx={{ color: "gold" }} />
                          <Typography
                            variant="h4"
                            sx={{
                              fontSize: "16px",
                              fontFamily: "Barlow",
                              fontWeight: "600",
                            }}
                          >
                            {averageRating}
                          </Typography>
                          {/* <Typography
                            variant="h4"
                            sx={{ fontSize: "14px", fontFamily: "Barlow" }}
                          >
                            ({singleStore.reviews.length})
                          </Typography> */}
                        </Box>
                      </Box>
                      <Box
                        className="address"
                        display="flex"
                        alignItems="center"
                      >
                        {/* <RoomOutlinedIcon sx={{ color: "#333333" }} /> */}
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "14px",
                            fontFamily: "Barlow",
                            color: "#333333",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {singleStore.address}
                        </Typography>
                      </Box>
                      <Box
                        className="storeType"
                        sx={{
                          border: "1px solid #D7D7D7",
                          borderRadius: "10px",
                          width: "50%",
                          margin: "0 auto",
                          padding: "8px",
                        }}
                        textAlign="center"
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "18px",
                            fontFamily: "Barlow",
                            fontWeight: "600",
                            color: "#333333",
                          }}
                        >
                          {singleStore.type || "Saloon"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "14px",
                            fontFamily: "Barlow",
                            color: "#333333",
                          }}
                        >
                          {singleStore.type || "Saloon"} •{" "}
                          {singleStore.reviews.length == 1
                            ? `${singleStore.reviews.length} Reviews`
                            : `${singleStore.reviews.length} Review`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              );
            })}
      </Slider>
    </Box>
  );
}

export default Carousel;

const PrevArrow = ({ className, style, onClick }) => (
  <IconButton
    className="arrow-prev-custom"
    onClick={onClick}
    sx={{
      backgroundColor: "#fff",
      color: "black",
      transition: "all 0.3s ease",
      "&:hover": { color: "black", backgroundColor: "#dbdbdb" },
      position: "absolute",
      left: "-50px",
      top: "28%",
      zIndex: 1,
      borderRadius: "20px",
      rotate: "180deg",
      border: "1px solid #dbdbdb",
      width: "40px",
      height: "40px",
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

const NextArrow = ({ className, style, onClick }) => (
  <IconButton
    className="arrow-next-custom"
    onClick={onClick}
    sx={{
      backgroundColor: "#fff",
      color: "black",
      transition: "all 0.3s ease",
      "&:hover": { color: "black", backgroundColor: "#dbdbdb" },
      position: "absolute",
      right: "-30px",
      top: "28%",
      zIndex: 1,
      borderRadius: "20px",
      border: "1px solid #dbdbdb",
      width: "40px",
      height: "40px",
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);
