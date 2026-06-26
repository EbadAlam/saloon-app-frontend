import React, { useEffect, useState } from "react";
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
import { Helmet } from "react-helmet-async";
import { useSnackbar } from "../../contexts/SnackBarContext";
import { getRecentlyViewedStoreIds } from "../../Utils/storeRecentlyViewed";

const isBrowser = typeof window !== "undefined";
function Home() {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || "",
  );
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState({});
  const [bookingCount, setBookingCount] = useState(0);
  const [reviews, setReviews] = useState({});
  const [recentStores, setRecentStores] = useState([]);
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (!isBrowser) return;
    document.body.classList.remove("search-page");
  }, [location, isBrowser]);
  // useEffect(() => {
  //   if (!isBrowser) return;
  //   const viewed = getRecentlyViewedStoreIds();
  //   setRecentStores(viewed);
  // }, []);
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
        const viewedStoreIds = getRecentlyViewedStoreIds();
        const { data } = await axiosClient.post("/getStoresHome", {
          viewedStoreIds: viewedStoreIds,
        });
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
    dots: true,
    infinite: false,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
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
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  useEffect(() => {
    if (successMessage) {
      showSnackbar(successMessage, "success");
    }
  }, [successMessage]);
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
        <div className="homeNewDesign">
          <div className="container">
            <Box
              className="main_banner"
              sx={{ paddingBlock: "100px", position: "relative" }}
            >
              <Box
                className="content"
                sx={{ zIndex: "1", position: "relative" }}
              >
                <Box className="heading">
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#000",
                      fontSize: "40px",
                      textAlign: "center",
                    }}
                  >
                    Book Local Beauty & Wellness Service...
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    Find the best salons, barbershops, medspas, wellness
                    centers, and beauty specialists that millions of people
                    around the world trust.
                  </Typography>
                </Box>
                <Box className="search_bar">
                  <SearchBar />
                </Box>
                <Box className="booking_count">
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "32px",
                      textAlign: "center",
                    }}
                  >
                    {bookingCount} appointments are booked today.
                  </Typography>
                </Box>
                {/* <Box
                  className="get_app_btn mt-5"
                  display="flex"
                  justifyContent="center"
                >
                  <Link to={ROUTES.getTheApp}>
                    <Button
                      sx={{
                        background: "#FFF8F0",
                        color: "#333333",
                        borderRadius: "40px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      Get the app <QrCodeIcon />
                    </Button>
                  </Link>
                </Box> */}
              </Box>
              <div className="background-gradient"></div>
            </Box>
          </div>
          {stores?.recentlyViewedStores?.length > 0 && (
            <Box
              className="recommended"
              sx={{ background: "", zIndex: "3", position: "relative" }}
            >
              <div className="container" style={{ paddingTop: "40px" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                  }}
                >
                  Recently Viewed
                </Typography>
                <Box className="sliders">
                  <Carousel stores={stores.recentlyViewedStores} />
                </Box>
              </div>
            </Box>
          )}

          <Box className="sliders">
            <Box className="recommended" sx={{ background: "", zIndex: "3" }}>
              <div className="container" style={{ paddingTop: "40px" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                  }}
                >
                  Recommended
                </Typography>
                <Box className="slider">
                  <Carousel stores={stores.new} />
                </Box>
              </div>
            </Box>
            <Box className="new_to_site" sx={{ background: "", zIndex: "3" }}>
              <div className="container" style={{ paddingTop: "40px" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                  }}
                >
                  New to BeautyTrafic
                </Typography>
                <Box className="slider">
                  <Carousel stores={stores.new} />
                </Box>
              </div>
            </Box>
            <Box className="trending" sx={{ background: "", zIndex: "3" }}>
              <div className="container" style={{ paddingTop: "40px" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                  }}
                >
                  Trending
                </Typography>
                <Box className="slider">
                  <Carousel stores={stores.trending} />
                </Box>
              </div>
            </Box>
          </Box>
          {/* <Box className="download_app_section">
            <div className="container">
              <Box className="content">
                    <Box className="avail_heading" display='flex' alignItems='center' gap='8px'>
                      <Typography variant="h3">Available on</Typography>
                      <Box className="google_icon icon">
                        <GoogleIcon />
                      </Box>
                      <Box className="apple_icon icon">
                        <AppleIcon />
                      </Box>
                      <Box className="play_store_icon icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M3 3.71831V28.2808C3.00016 28.3341 3.01606 28.3862 3.04569 28.4305C3.07532 28.4747 3.11737 28.5093 3.16656 28.5298C3.21575 28.5503 3.2699 28.5558 3.32222 28.5456C3.37453 28.5355 3.42268 28.5101 3.46062 28.4727L16.25 16.0002L3.46062 3.52644C3.42268 3.48902 3.37453 3.46364 3.32222 3.45349C3.2699 3.44333 3.21575 3.44884 3.16656 3.46933C3.11737 3.48982 3.07532 3.52438 3.04569 3.56867C3.01606 3.61297 3.00016 3.66502 3 3.71831ZM21.6125 10.8752L5.57625 2.04019L5.56625 2.03456C5.29 1.88456 5.0275 2.25831 5.25375 2.47581L17.8244 14.4958L21.6125 10.8752ZM5.255 29.5246C5.0275 29.7421 5.29 30.1158 5.5675 29.9658L5.5775 29.9602L21.6125 21.1252L17.8244 17.5033L5.255 29.5246ZM28.0863 14.4377L23.6081 11.9714L19.3975 16.0002L23.6081 20.0271L28.0863 17.5627C29.3044 16.8896 29.3044 15.1108 28.0863 14.4377Z" fill="#2E2E2E"/>
                        </svg>
                      </Box>
                    </Box>
                    <Box className="download_heading">
                      <Typography variant="h1">Download the Beauty trafic app...</Typography>
                      <Typography variant="h3">Book unforgettable beauty and wellness experiences with the BeautyTrafic mobile app</Typography>
                    </Box>
                    <Box
                      className="get_app_btn mt-5"
                      display="flex"
                      justifyContent="center"
                      sx={{width:'65%'}}
                    >
                      <Link to={ROUTES.getTheApp}>
                        <Button
                          sx={{
                            background: "#FFF8F0",
                            color: "#333333",
                            borderRadius: "40px",
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          Get the app <QrCodeIcon />
                        </Button>
                      </Link>
                    </Box>
              </Box>
            </div>
              <Box className="banner_img">
                <img className="mobile_img" src={`${process.env.REACT_APP_BASE_URL}/avail_banner_img_1.png`} alt="" />
                <img className="pillers_img" src={`${process.env.REACT_APP_BASE_URL}/pillers.png`} alt="" />
              </Box>
          </Box> */}
          <Box className="how_it_works">
            <div className="container">
              <div className="head">
                <Typography variant="body1" className="subHeading">
                  simple process
                </Typography>
                <Typography variant="h3" className="heading">
                  How it works
                </Typography>
                <Typography variant="h5" className="description">
                  Book your next beauty and wellness appointment in 3 easy steps
                </Typography>
              </div>
              <div className="steps">
                <Box className="step">
                  <Box className="step_img">
                    <div className="step_no">1</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-search w-9 h-9 text-white"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </Box>
                  <Typography variant="h5" className="step_title">
                    Search Service
                  </Typography>
                  <Typography variant="body1" className="step_description">
                    Browse or search for the beauty service you need in your
                    area
                  </Typography>
                </Box>
                <Box className="step">
                  <Box className="step_img">
                    <div className="step_no">2</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-users w-9 h-9 text-white"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </Box>
                  <Typography variant="h5" className="step_title">
                    Compare Providers
                  </Typography>
                  <Typography variant="body1" className="step_description">
                    View profiles, portfolios, prices, and reviews to find the
                    perfect match
                  </Typography>
                </Box>
                <Box className="step">
                  <Box className="step_img">
                    <div className="step_no">3</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-calendar w-9 h-9 text-white"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                  </Box>
                  <Typography variant="h5" className="step_title">
                    Book Instantly
                  </Typography>
                  <Typography variant="body1" className="step_description">
                    Select your preferred date and time, then confirm your
                    booking securely
                  </Typography>
                </Box>
              </div>
            </div>
          </Box>
          <div className="whyChooseUs">
            <div className="container">
              <div className="head">
                <Typography variant="body1" className="subHeading">
                  Our Promise
                </Typography>
                <Typography variant="h3" className="heading">
                  Why Choose Our Platform?
                </Typography>
                <Typography variant="h5" className="description">
                  The most trusted beauty services marketplace in Pakistan
                </Typography>
              </div>
              <div className="cards">
                <div className="card">
                  <div className="card_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-shield-check w-7 h-7 text-white"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <Typography variant="h5" className="card_title">
                    Verified Professionals
                  </Typography>
                  <Typography variant="body1" className="card_description">
                    All providers are verified with background checks and
                    certifications
                  </Typography>
                </div>
                <div className="card">
                  <div className="card_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-dollar-sign w-7 h-7 text-white"
                    >
                      <line x1="12" x2="12" y1="2" y2="22"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <Typography variant="h5" className="card_title">
                    Transparent Pricing
                  </Typography>
                  <Typography variant="body1" className="card_description">
                    No hidden charges. Compare prices upfront before booking
                  </Typography>
                </div>
                <div className="card">
                  <div className="card_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-star w-7 h-7 text-white"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  </div>
                  <Typography variant="h5" className="card_title">
                    Real Reviews
                  </Typography>
                  <Typography variant="body1" className="card_description">
                    Authentic reviews from verified clients to help you decide
                  </Typography>
                </div>
                <div className="card">
                  <div className="card_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-calendar w-7 h-7 text-white"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                  </div>
                  <Typography variant="h5" className="card_title">
                    Easy Booking
                  </Typography>
                  <Typography variant="body1" className="card_description">
                    Book appointments 24/7 with instant confirmation
                  </Typography>
                </div>
                <div className="card">
                  <div className="card_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-credit-card w-7 h-7 text-white"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <Typography variant="h5" className="card_title">
                    Secure Payments
                  </Typography>
                  <Typography variant="body1" className="card_description">
                    Multiple payment options with bank-grade security
                  </Typography>
                </div>
                <div className="card">
                  <div className="card_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-tag w-7 h-7 text-white"
                    >
                      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </svg>
                  </div>
                  <Typography variant="h5" className="card_title">
                    Best Deals
                  </Typography>
                  <Typography variant="body1" className="card_description">
                    Exclusive discounts and special offers for members
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          {reviews && reviews.length > 0 && (
            <Box className="reviews_slider">
              <Box className="container">
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "30px",
                    fontFamily: "Barlow",
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  What client says
                </Typography>
                <Slider {...reivewsSliderSettings} className="mt-5">
                  {reviews.map((singleRev) => (
                    <Box className="singleReview">
                      <Box className="rating">
                        <StarRating
                          rating={singleRev.rating}
                          size="large"
                          color="gold"
                        />
                        {/* <Typography variant="body1" sx={{fontSize:'16px',fontWeight:'600',fontFamily:'Barlow'}}>{singleRev.rating}</Typography> */}
                      </Box>
                      <Box className="review">
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: "22px",
                            fontWeight: "600",
                            fontFamily: "Barlow",
                            textTransform: "capitalize",
                          }}
                        >
                          {singleRev.title}
                        </Typography>
                        <Typography
                          className="review_content"
                          variant="body1"
                          sx={{ fontSize: "18px", fontFamily: "Barlow" }}
                        >
                          {singleRev.review}
                        </Typography>
                      </Box>
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
                          {singleRev.reviewer.user_info.city && (
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "14px", fontFamily: "Barlow" }}
                            >
                              {singleRev.reviewer.user_info.city}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          )}
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
        </div>
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
      backgroundColor: "white",
      color: "black",
      transition: "all 0.3s ease",
      "&:hover": { color: "black", backgroundColor: "#ffc0cb87" },
      position: "absolute",
      left: "-40px",
      rotate: "180deg",
      top: "40%",
      zIndex: 1,
      borderRadius: "20px",
      border: "1px solid #ffc0cb87",
      width: "40px",
      height: "40px",
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

const NextArrow = ({ className, style, onClick }) => (
  <IconButton
    onClick={onClick}
    className="arrow-next-custom"
    sx={{
      backgroundColor: "white",
      color: "black",
      transition: "all 0.3s ease",
      "&:hover": { color: "black", backgroundColor: "#ffc0cb87" },
      position: "absolute",
      right: "-40px",
      top: "40%",
      zIndex: 1,
      borderRadius: "20px",
      border: "1px solid #ffc0cb87",
      width: "40px",
      height: "40px",
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);
