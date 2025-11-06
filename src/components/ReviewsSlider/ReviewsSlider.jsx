import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import StarRating from "../StarRating/StarRating";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function ReviewsSlider({reviews}) {
    const reivewsSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
  return (
    <>
        {reviews?.length > 0 && (
            <Box className="reviews_div">
                <img
                src={`${process.env.REACT_APP_BASE_URL}/reviews-bg-img.png`}
                alt=""
                className="bg_img"
                />
                <Box className="container">
                <Typography variant="h3">happy customer thoughts</Typography>
                <Box className="reviews">
                    <Slider {...reivewsSliderSettings}>
                    {reviews.map((singleReview) => (
                        <Box className="review" key={singleReview.id}>
                        <Typography variant="body1">
                            {singleReview.review}
                        </Typography>
                        <Box className="rating">
                            <StarRating
                            rating={singleReview.rating}
                            size="large"
                            />
                        </Box>
                        <Typography variant="h2">
                            ~{singleReview.reviewer.username}
                        </Typography>
                        </Box>
                    ))}
                    </Slider>
                </Box>
                </Box>
            </Box>
            )}
    </>
  )
}

export default ReviewsSlider;

const PrevArrow = ({ className, style, onClick }) => (
  <IconButton
    className="arrow-prev-custom"
    onClick={onClick}
    sx={{
      color: "black",
      "&:hover": { color: "black", background: "transparent !important" },
      svg: { fontSize: "50px" },
      position: "absolute",
      left: "-35%",
      top: 0,
      zIndex: 1,
    }}
  >
    <ArrowBackIosIcon />
  </IconButton>
);

const NextArrow = ({ className, style, onClick }) => (
  <IconButton
    onClick={onClick}
    className="arrow-next-custom"
    sx={{
      color: "black",
      "&:hover": { color: "black", background: "transparent !important" },
      svg: { fontSize: "50px" },
      position: "absolute",
      right: "-35%",
      top: 0,
      zIndex: 1,
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);