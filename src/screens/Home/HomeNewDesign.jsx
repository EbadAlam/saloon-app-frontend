import React, { useEffect, useState } from "react";
import { Alert, Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { ROUTES } from "../../routes";
import Carousel from "../../components/Carousel/CarouselNew";
import axiosClient from "../../axios-client";
import SkeletonHome from "../../components/Loader/SkeletonHome";
import SearchBar from "../../components/SearchBar/SearchBar";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarRating from "../../components/StarRating/StarRating";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
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
  const [categories, setCategories] = useState([]);
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
        setCategories(data.categories);
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
    slidesToShow: 3,
    slidesToScroll: 3,
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
        <div className="homeNewDesign homeNewDesignUpdated">
          <Box className="main_banner">
            <div className="banner_blob_1"></div>
            <div className="banner_blob_2"></div>
            <div className="banner_blob_3"></div>
            <div className="container">
              <div className="banner_content">
                <div className="banner_badge">
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
                    class="lucide lucide-sparkles w-4 h-4 text-[#D4A373]"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                    <path d="M20 3v4"></path>
                    <path d="M22 5h-4"></path>
                    <path d="M4 17v2"></path>
                    <path d="M5 18H3"></path>
                  </svg>
                  Pakistan's Premier Beauty Marketplace
                </div>
                <div className="banner_heading">
                  <h2>
                    Find & Book <span>Trusted Beauty</span> Professionals
                  </h2>
                </div>
                <div className="banner_text">
                  <p>
                    Compare prices, read reviews, explore portfolios, check
                    availability, and book beauty services instantly — all in
                    one place.
                  </p>
                </div>
                <div className="banner_btns">
                  <Link>
                    <button className="find_service">Find service</button>
                  </Link>
                  <Link>
                    <button className="join_prof">Join as professional</button>
                  </Link>
                </div>
                <hr className="divider" />
                <div className="banner_meta">
                  <div className="meta_box">
                    <p className="count">2,500+</p>
                    <p className="text">Professionals</p>
                  </div>
                  <div className="meta_box">
                    <p className="count">2,500+</p>
                    <p className="text">Professionals</p>
                  </div>
                  <div className="meta_box">
                    <p className="count">2,500+</p>
                    <p className="text">Professionals</p>
                  </div>
                </div>
              </div>
              <div className="banner_image">
                <div className="bg-border"></div>
                <div className="image">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/blog_img.png`}
                    alt="Banner Image"
                  />
                </div>
                {/* <div className="reviews_overview">
                  <div className="avg_rating">
                    <p>4.9</p>
                  </div>
                </div> */}
              </div>
            </div>
          </Box>
          <div className="categories">
            <div className="container">
              <div className="headings">
                <h4 className="sub_heading">explore</h4>
                <h2 className="heading">Browse Beauty Categories</h2>
                <p className="desc">
                  Discover trusted professionals across all beauty services
                </p>
              </div>
              <div className="categories_cards">
                {/* {categories && categories.length > 0 && (
                  categories.slice(0,10).map((singleCat) => (
                    <div className="category_card">
                      <img src={`${process.env.REACT_APP_IMG_URL}/${singleCat.thumbnail}`} alt={singleCat.title} />
                      <div className="category_info">
                        <h6>{singleCat.title}</h6>
                        <p>420 services</p>
                      </div>
                    </div>
                  ))
                )} */}
              </div>
            </div>
          </div>
          {/* {stores?.recentlyViewedStores?.length > 0 && (
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
          )} */}
          <Box className="sliders">
            <Box className="recommended">
              <div className="container">
                <div className="headings">
                  <h4 className="sub_heading">Top Rated</h4>
                  <h2 className="heading">Featured Professionals</h2>
                  <p className="desc">
                    Top-rated beauty experts trusted by thousands
                  </p>
                </div>
                <Box className="slider">
                  <Carousel stores={stores.new} />
                </Box>
              </div>
            </Box>
            {/* <Box className="new_to_site" sx={{ background: "", zIndex: "3" }}>
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
            </Box>  */}
          </Box>

          <Box className="how_it_works">
            <div className="container">
              <div className="head">
                <Typography variant="body1" className="sub_heading">
                  simple process
                </Typography>
                <Typography variant="h3" className="heading">
                  How it works
                </Typography>
                <Typography variant="h5" className="desc">
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
                <Typography variant="body1" className="sub_heading">
                  Our Promise
                </Typography>
                <Typography variant="h3" className="heading">
                  Why Choose Our Platform?
                </Typography>
                <Typography variant="h5" className="desc">
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
                {/* <div className="card">
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
                </div> */}
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
                <div className="headings">
                  <h4 className="sub_heading">Testimonials</h4>
                  <h2 className="heading">What Our Clients Say</h2>
                  <p className="desc">
                    Real experiences from thousands of satisfied customers
                  </p>
                </div>
                <Slider {...reivewsSliderSettings} className="mt-5">
                  {reviews.map((singleRev) => (
                    <Box className="singleReview">
                      <div className="testimonial_icon">
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
                          class="lucide lucide-quote w-5 h-5 text-white"
                        >
                          <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                          <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                        </svg>
                      </div>
                      <Box className="rating">
                        <StarRating
                          rating={singleRev.rating}
                          size="large"
                          color="gold"
                        />
                      </Box>
                      <Box className="review">
                        <h4 className="review_tagline">{singleRev.title}</h4>
                        <p className="review_text">{singleRev.review}</p>
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
          <div className="grow-section">
            <div className="blob-1"></div>
            <div className="blob-2"></div>
            <div className="blob-3"></div>
            <div className="container">
              <div className="grow-content">
                <div className="badge">
                  <p>For Beauty Professionals</p>
                </div>
                <h2 className="heading">
                  Grow Your Beauty Business <br /> <span>With Us</span>
                </h2>
                <p className="desc">
                  Join Pakistan's largest beauty services marketplace and take
                  your business to the next level. Get access to thousands of
                  clients looking for your services.
                </p>
                <div className="grow-boxes">
                  <div className="grow-box">
                    <h4 className="count-number">2,500+</h4>
                    <p className="text">Active Providers</p>
                  </div>
                  <div className="grow-box">
                    <h4 className="count-number">50,000+</h4>
                    <p className="text">Monthly Bookings</p>
                  </div>
                </div>
                <div className="grow_btns">
                  <button className="register">Register your business</button>
                  <button className="learn-more">Learn more</button>
                </div>
              </div>
              <div className="grow-cards">
                <div className="grow-card">
                  <div className="icon">
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
                      class="lucide lucide-users w-6 h-6 text-[#D4A373]"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="card-title">
                    <h5>Reach More Clients</h5>
                  </div>
                  <div className="card-text">
                    <p>
                      Connect with thousands of potential customers actively
                      searching for beauty services
                    </p>
                  </div>
                </div>
                <div className="grow-card">
                  <div className="icon">
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
                      class="lucide lucide-users w-6 h-6 text-[#D4A373]"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="card-title">
                    <h5>Reach More Clients</h5>
                  </div>
                  <div className="card-text">
                    <p>
                      Connect with thousands of potential customers actively
                      searching for beauty services
                    </p>
                  </div>
                </div>
                <div className="grow-card">
                  <div className="icon">
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
                      class="lucide lucide-users w-6 h-6 text-[#D4A373]"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="card-title">
                    <h5>Reach More Clients</h5>
                  </div>
                  <div className="card-text">
                    <p>
                      Connect with thousands of potential customers actively
                      searching for beauty services
                    </p>
                  </div>
                </div>
                <div className="grow-card">
                  <div className="icon">
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
                      class="lucide lucide-users w-6 h-6 text-[#D4A373]"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="card-title">
                    <h5>Reach More Clients</h5>
                  </div>
                  <div className="card-text">
                    <p>
                      Connect with thousands of potential customers actively
                      searching for beauty services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pricing-section">
            <div className="container">
              <div className="headings">
                <h4 className="sub_heading">Plans</h4>
                <h2 className="heading">Simple, Transparent Pricing</h2>
                <p className="desc">
                  Choose the perfect plan to grow your beauty business
                </p>
              </div>
              <div className="pricing-plans">
                <div className="plan">
                  <div className="plan-header">
                    <h4 className="plan-title">Starter</h4>
                    <p className="plan-desc">
                      Perfect for individual professionals starting out
                    </p>
                  </div>
                  <div className="plan-body">
                    <div className="plan-price">
                      <h3 className="price">Free</h3>
                      <p className="billing-cycle">forever</p>
                    </div>
                    <hr className="divider" />
                    <div className="plan-features">
                      <ul className="features-list">
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Basic profile listing</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Up to 5 portfolio images</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Receive bookings</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Basic analytics</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Email support</p>
                        </li>
                      </ul>
                    </div>
                    <button className="get-started">Get started</button>
                  </div>
                </div>
                <div className="plan popular">
                  <div className="badge">
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
                      class="lucide lucide-sparkles w-3.5 h-3.5"
                    >
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                      <path d="M20 3v4"></path>
                      <path d="M22 5h-4"></path>
                      <path d="M4 17v2"></path>
                      <path d="M5 18H3"></path>
                    </svg>
                    <p>most popular</p>
                  </div>
                  <div className="plan-header">
                    <h4 className="plan-title">Professional</h4>
                    <p className="plan-desc">
                      Most popular choice for growing businesses
                    </p>
                  </div>
                  <div className="plan-body">
                    <div className="plan-price">
                      <h3 className="price">PKR 2,999</h3>
                      <p className="billing-cycle">per month</p>
                    </div>
                    <hr className="divider" />
                    <div className="plan-features">
                      <ul className="features-list">
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Premium profile placement</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Unlimited portfolio images</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Priority bookings</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Advanced analytics & insights</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Priority support</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Featured in search results</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Custom booking page</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Promotional tools</p>
                        </li>
                      </ul>
                    </div>
                    <button className="get-started">Get started</button>
                  </div>
                </div>
                <div className="plan">
                  <div className="plan-header">
                    <h4 className="plan-title">Premium</h4>
                    <p className="plan-desc">
                      For established businesses that want it all
                    </p>
                  </div>
                  <div className="plan-body">
                    <div className="plan-price">
                      <h3 className="price">PKR 4,999</h3>
                      <p className="billing-cycle">per month</p>
                    </div>
                    <hr className="divider" />
                    <div className="plan-features">
                      <ul className="features-list">
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Everything in Professional</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Top placement guarantee</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Verified badge</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Social media integration</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Dedicated account manager</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>Marketing campaigns</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>API access</p>
                        </li>
                        <li>
                          <div className="icon">
                            <DoneOutlinedIcon />
                          </div>
                          <p>White-label options</p>
                        </li>
                      </ul>
                    </div>
                    <button className="get-started">Get started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cta-section">
            <div className="blob-1"></div>
            <div className="blob-2"></div>
            <div className="container">
              <div className="sub-container">
                <div className="badge">
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
                  class="lucide lucide-sparkles w-3.5 h-3.5"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                <p>Join 50,000+ Happy Customers</p>
              </div>
              <h2 className="heading">Ready to Find Your Perfect <span>Beauty Professional?</span></h2>
              <p className="desc">Start your beauty journey today. Book trusted professionals, compare prices, and transform your look with confidence.</p>
              <div className="cta-actions">
                <button className="book-now">Book now</button>
                <button className="become-prof">Become a professional</button>
              </div>
              <hr className="divider" />
              <div className="cta-footer">
                <div className="cta-card">
                  <div className="count">
                    <p>2,500+</p>
                  </div>
                  <div className="text">
                    <p>Verified Providers</p>
                  </div>
                </div>
                <div className="cta-card">
                  <div className="count">
                    <p>2,500+</p>
                  </div>
                  <div className="text">
                    <p>Verified Providers</p>
                  </div>
                </div>
                <div className="cta-card">
                  <div className="count">
                    <p>2,500+</p>
                  </div>
                  <div className="text">
                    <p>Verified Providers</p>
                  </div>
                </div>
                <div className="cta-card">
                  <div className="count">
                    <p>2,500+</p>
                  </div>
                  <div className="text">
                    <p>Verified Providers</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;

const PrevArrow = ({ className, style, onClick }) => (
  <IconButton className="arrow-prev-custom custom-arrow" onClick={onClick}>
    <ArrowForwardIosIcon />
  </IconButton>
);

const NextArrow = ({ className, style, onClick }) => (
  <IconButton onClick={onClick} className="arrow-next-custom custom-arrow">
    <ArrowForwardIosIcon />
  </IconButton>
);
