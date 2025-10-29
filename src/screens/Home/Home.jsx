import React, { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { ROUTES } from "../../routes";
import Carousel from "../../components/Carousel/Carousel";
import axiosClient from "../../axios-client";
import SkeletonHome from "../../components/Loader/SkeletonHome";
import SearchBar from "../../components/SearchBar/SearchBar";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarRating from "../../components/StarRating/StarRating";
import DummyImage from "../../components/DummyImage/DummyImage";
import { getRecentlyViewedStores } from "../../Utils/storeRecentlyViewed";
import { Helmet } from "react-helmet-async";
import { useSnackbar } from "../../contexts/SnackBarContext";

const isBrowser = typeof window !== "undefined";
function Home() {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || ""
  );
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState({});
  const [bookingCount, setBookingCount] = useState(0);
  const [reviews, setReviews] = useState({});
  const [recentStores, setRecentStores] = useState([]);
  const sectionRef = useRef(null);
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (!isBrowser) return;
    document.body.classList.remove("search-page");
  }, [location, isBrowser]);
  useEffect(() => {
    if (!isBrowser) return;
    const viewed = getRecentlyViewedStores();
    setRecentStores(viewed);
  }, []);
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchStores = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get("/getStores");
        setStores(data.stores);
        setBookingCount(data.bookingCount);
        setReviews(data.reviews);
      } catch (err) {
        console.error("error fetching stores ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const reivewsSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    if (successMessage) {
      showSnackbar(successMessage, "success");
    }
  }, [successMessage]);

  const bubbles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 60 + Math.random() * 60,
  }));
  return (
    <>
      <Helmet>
        <title>Beauty Traffic</title>
        <meta
          name="description"
          content="A place where you can find al nearby saloons and book an appointment just by sitting at home"
        />
      </Helmet>
      {loading ? (
        <SkeletonHome />
      ) : (
        <>
          <Box className="main_banner new_banner">
            <Box className="content" sx={{ zIndex: "1", position: "relative" }}>
              <Box className="overlay"></Box>
              <Box className="bg_img">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/new-banner-bg.jpg`}
                  alt=""
                />
              </Box>
              <Box className="bubble_section" ref={sectionRef}>
                {bubbles.map((b, i) => (
                  <img
                    key={i}
                    src={`${process.env.REACT_APP_BASE_URL}/bubble.png`}
                    alt="bubble"
                    className="bubble"
                    data-speed={b.speed}
                    style={{
                      left: `${b.left}%`,
                      top: `${b.top}%`,
                      width: `${b.size}px`,
                    }}
                  />
                ))}
              </Box>
              <Box className="container">
                <Box className="banner_content">
                  <Box className="image">
                    {/* <img src={`${process.env.REACT_APP_BASE_URL}/bubble.png`} alt="" /> */}
                  </Box>
                  <Box className="text">
                    <Typography variant="h4">discover local gems</Typography>
                    <Typography variant="h2">
                      relax & renew at
                      <br /> top salons & spa's
                    </Typography>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Saepe sequi minus iure, molestias eaque placeat enim in
                      temporibus, eum voluptate totam, nisi repellendus? Quidem
                      distinctio vero non, illo magni amet!
                    </Typography>
                    <Link style={{width:'fit-content'}}>
                      <Button variant="contained">Explore Now</Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <div className="background-gradient"></div> */}
          </Box>
          <Box className="categories_section">
            <Box className="container">
              <Box className="categories">
                <Box className="category">
                  <Link>
                    <Box className="cat_image">
                      <img
                        src="https://dt-embel.myshopify.com/cdn/shop/collections/c6.png"
                        alt=""
                      />
                    </Box>
                    <Box className="cat_name">
                      <Typography variant="h3">Category</Typography>
                    </Box>
                  </Link>
                </Box>
                <Box className="category">
                  <Link>
                    <Box className="cat_image">
                      <img
                        src="https://dt-embel.myshopify.com/cdn/shop/collections/c6.png"
                        alt=""
                      />
                    </Box>
                    <Box className="cat_name">
                      <Typography variant="h3">Category</Typography>
                    </Box>
                  </Link>
                </Box>
                <Box className="category">
                  <Link>
                    <Box className="cat_image">
                      <img
                        src="https://dt-embel.myshopify.com/cdn/shop/collections/c6.png"
                        alt=""
                      />
                    </Box>
                    <Box className="cat_name">
                      <Typography variant="h3">Category</Typography>
                    </Box>
                  </Link>
                </Box>
                <Box className="category">
                  <Link>
                    <Box className="cat_image">
                      <img
                        src="https://dt-embel.myshopify.com/cdn/shop/collections/c6.png"
                        alt=""
                      />
                    </Box>
                    <Box className="cat_name">
                      <Typography variant="h3">Category</Typography>
                    </Box>
                  </Link>
                </Box>
                <Box className="category">
                  <Link>
                    <Box className="cat_image">
                      <img
                        src="https://dt-embel.myshopify.com/cdn/shop/collections/c6.png"
                        alt=""
                      />
                    </Box>
                    <Box className="cat_name">
                      <Typography variant="h3">Category</Typography>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="stores_section new_stores">
            <Box className="container">
              <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                    fontFamily: "Barlow",
                    fontWeight: "600",
                    color: "#333333",
                    textAlign:'center'
                  }}
                >
                  New to Site
                </Typography>
                <hr />
                <Box className="stores">
                  <Link className="store">
                      <Box className="store_image">
                        <img src="http://127.0.0.1:8000/storage/thumbnails/3UpeT36WJGKaP8vpkbw93xXbWbkYUlzCmBLUJcUV.jpg" alt="" />
                        <Box className="hover_content">
                          <Link>
                            <Button>Explore now</Button>
                          </Link>
                        </Box>
                        <Box className="overlay"></Box>
                      </Box>
                      <Box className="store_content">
                        <Typography variant="h3">Store name</Typography>
                        <StarRating rating={3} color="#ffc800" />
                        <Typography variant="h4">Store type</Typography>
                      </Box>
                  </Link>
                </Box>
            </Box>
          </Box>
          <Box className="sliders">
            <Box className="new_to_site" sx={{ background: "#E4F1F2", zIndex: "3" }}>
              <div className="container" style={{ paddingBlock: "40px" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                    fontFamily: "Barlow",
                    fontWeight: "600",
                    color: "#333333",
                  }}
                >
                  New to BeautyTrafic
                </Typography>
                <Box className="slider">
                  <Carousel stores={stores.new} />
                </Box>
              </div>
            </Box>
          </Box>
          {/* {reviews && reviews.length > 0 && (
            <Box className="reviews_slider">
              <Box className="container">
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                    fontFamily: "Barlow",
                    fontWeight: "600",
                  }}
                >
                  Reviews
                </Typography>
                <Slider {...reivewsSliderSettings} className="mt-5">
                  {reviews.map((singleRev) => (
                    <Box className="singleReview">
                      <Box className="userInfo">
                        <Box className="profileImg">
                          {singleRev.reviewer.user_info.profile_image ? (
                            singleRev.reviewer.user_info.signup_platform ==
                            "manual" ? (
                              <img
                                src={`${process.env.REACT_APP_IMG_URL}/${singleRev.reviewer.user_info.profile_image}`}
                                alt=""
                              />
                            ) : (
                              <img
                                src={singleRev.reviewer.user_info.profile_image}
                                alt=""
                              />
                            )
                          ) : (
                            <DummyImage
                              username={singleRev.reviewer.username}
                            />
                          )}
                        </Box>
                        <Box className="username">
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "16px",
                              fontWeight: "600",
                              fontFamily: "Barlow",
                            }}
                          >
                            {singleRev.reviewer.username}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontSize: "14px", fontFamily: "Barlow" }}
                          >
                            {singleRev.reviewer.user_info.city}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="rating">
                        <StarRating rating={singleRev.rating} color="#F4C430" />
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "16px",
                            fontWeight: "600",
                            fontFamily: "Barlow",
                          }}
                        >
                          {singleRev.rating}
                        </Typography>
                      </Box>
                      <Box className="review">
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "18px",
                            fontWeight: "600",
                            fontFamily: "Barlow",
                          }}
                        >
                          {singleRev.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "14px", fontFamily: "Barlow" }}
                        >
                          {singleRev.review}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          )} */}
          <Box className="top_rated">
            <Typography variant="h2">
              The top-rated destination for beauty and wellness
            </Typography>
            <Typography variant="h3">
              One solution, one software. Trusted by the best in the beauty and
              wellness industry
            </Typography>
            <Typography variant="h1" className="count">
              1 Billion+
            </Typography>
            <Typography variant="h3">
              Appointments booked on beauty trafic
            </Typography>
            <Box className="count_info mt-5">
              <Box className="partners">
                <Typography variant="h2">150,000+</Typography>
                <Typography variant="h3">Partner businesses</Typography>
              </Box>
              <Box className="partners">
                <Typography variant="h2">110+ countries</Typography>
                <Typography variant="h3">using BeautyTrafic</Typography>
              </Box>
              <Box className="partners">
                <Typography variant="h2">350,000+</Typography>
                <Typography variant="h3">Stylists & professionals</Typography>
              </Box>
            </Box>
            <Box className="for_business mt-5">
              <Box className="container">
                <Box className="content">
                  <Typography variant="h1">
                    Beauty trafic for Business
                  </Typography>
                  <Typography variant="h2">
                    Boost your salon or spa business for free with the world’s
                    leading booking platform — rated No. 1 by industry experts.
                  </Typography>
                  <Button
                    sx={{
                      background: "#333333",
                      color: "#FFF8F0",
                      borderRadius: "30px",
                      padding: "10px 15px",
                      marginBlock: "15px",
                    }}
                  >
                    Find out more
                  </Button>
                  <Typography variant="h2">Excellent 5/5</Typography>
                  <Box className="rating" sx={{ marginBlock: "15px" }}>
                    <StarRating rating={5} />
                  </Box>
                  <Typography variant="body1">
                    Over {reviews.length} reviews.
                  </Typography>
                </Box>
              </Box>
              <Box className="image">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/for_business.png`}
                  alt=""
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Home;

const PrevArrow = ({ className, style, onClick }) => (
  <IconButton
    className="arrow-prev-custom"
    onClick={onClick}
    sx={{
      backgroundColor: "#F7CAC9",
      color: "black",
      "&:hover": { color: "black" },
      position: "absolute",
      left: "90%",
      top: "-90px",
      zIndex: 1,
      borderRadius: "20px 0px 0px 20px",
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
      backgroundColor: "#F7CAC9",
      color: "black",
      "&:hover": { color: "black" },
      position: "absolute",
      right: "4%",
      top: "-90px",
      zIndex: 1,
      borderRadius: "0px 20px 20px 0px",
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);
