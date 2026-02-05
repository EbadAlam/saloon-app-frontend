import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes";
import axiosClient from "../../axios-client";
import SkeletonHome from "../../components/Loader/SkeletonHome";
import Slider from "react-slick";
import StarRating from "../../components/StarRating/StarRating";
import { getRecentlyViewedStores } from "../../Utils/storeRecentlyViewed";
import { Helmet } from "react-helmet-async";
import { useSnackbar } from "../../contexts/SnackBarContext";
import StoreCard from "../../components/StoreCard/StoreCard";
import ReviewsSlider from "../../components/ReviewsSlider/ReviewsSlider";
import SearchBar from "../../components/SearchBar/SearchBar";

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
        setCategories(data.categories);
      } catch (err) {
        console.error("error fetching stores ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);
  useEffect(() => {
    if (successMessage) {
      showSnackbar(successMessage, "success");
    }
  }, [successMessage]);
  const categoriesSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 8,
    slidesToScroll: 8,
     responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 2,slidesToScroll: 2 }
    },
     ]
  };
  const calculateAverageRating = (reviews = []) => {
    const total = reviews.reduce(
      (sum, r) => sum + parseFloat(r.rating || 0),
      0,
    );
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "";
  };
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
          <Box className="home_new">
            <Box className="home_banner">
              <Box className="overlay"></Box>
              <Box className="banner_content container">
                <Box className="heading">
                  <Typography variant="h1">
                    Book beauty & wellness <br />
                    near you
                  </Typography>
                </Box>
                <Box className="search"><SearchBar /></Box>
              </Box>
            </Box>
            <Box className="categories_slider">
              <Box className="container">
                <Box className="slider">
                  {/* <Button className="category active">
                    <Typography variant="body1">All</Typography>
                  </Button> */}
                  <Slider {...categoriesSliderSettings}>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((singleCat, index) => (
                        <Link to={ROUTES.getCategoryPage(singleCat.slug)}>
                          <Button className="category" key={index}>
                            <Typography variant="body1">
                              {singleCat.title}
                            </Typography>
                          </Button>
                        </Link>
                      ))}
                  </Slider>
                </Box>
              </Box>
            </Box>
            <hr className="divider" />
            <Box className="stores">
              <Box className="container">
                <Box className="heading">
                  <Typography variant="h2">New</Typography>
                  <Link to={ROUTES.getCategoryPage('all')}>
                    <Button className="view_all">View All</Button>
                  </Link>
                </Box>
                <Box className="stores_cards">
                  {stores?.new?.length > 0 &&
                    stores.new.slice(0, 5).map((singleStore, index) => {
                      const rating = calculateAverageRating(singleStore.reviews);
                      return (
                        <Box className="store_card" key={index}>
                          <Box className="image">
                            <Link
                              to={ROUTES.getStoreFrontPage(singleStore.slug)}
                            >
                              {singleStore.thumbnail ? (
                                <img
                                  src={`${process.env.REACT_APP_IMG_URL}/${singleStore.thumbnail}`}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/store-dummy-img.png`}
                                  alt=""
                                />
                              )}
                            </Link>
                          </Box>
                          <Box className="store_content">
                            <Link
                              to={ROUTES.getStoreFrontPage(singleStore.slug)}
                            >
                              <Typography variant="h3">
                                {singleStore.title}
                              </Typography>
                            </Link>
                            <Box className="rating">
                              <StarRating
                                rating={rating}
                                color="#ffb200"
                                size="small"
                              /> ({singleStore.reviews.length ?? 0})
                            </Box>
                            <Box className="address">
                              <Typography variant="body1">
                                {singleStore.address}
                              </Typography>
                            </Box>
                            <Box className="booking">
                              <Link
                                to={ROUTES.getBookingPage(singleStore.slug)}
                              >
                                <Button>Book Now</Button>
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
            <Box className="stores">
              <Box className="container">
                <Box className="heading">
                  <Typography variant="h2">trending</Typography>
                  <Link to={ROUTES.getCategoryPage('all')}>
                    <Button className="view_all">View All</Button>
                  </Link>
                </Box>
                <Box className="stores_cards">
                  {stores?.trending?.length > 0 &&
                    stores.trending.slice(0, 5).map((singleStore, index) => {
                      const rating = calculateAverageRating(singleStore.reviews);
                      return (
                        <Box className="store_card" key={index}>
                          <Box className="image">
                            <Link
                              to={ROUTES.getStoreFrontPage(singleStore.slug)}
                            >
                              {singleStore.thumbnail ? (
                                <img
                                  src={`${process.env.REACT_APP_IMG_URL}/${singleStore.thumbnail}`}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/store-dummy-img.png`}
                                  alt=""
                                />
                              )}
                            </Link>
                          </Box>
                          <Box className="store_content">
                            <Link
                              to={ROUTES.getStoreFrontPage(singleStore.slug)}
                            >
                              <Typography variant="h3">
                                {singleStore.title}
                              </Typography>
                            </Link>
                            <Box className="rating">
                              <StarRating
                                rating={rating}
                                color="#ffb200"
                                size="small"
                              /> ({singleStore.reviews.length ?? 0})
                            </Box>
                            <Box className="address">
                              <Typography variant="body1">
                                {singleStore.address}
                              </Typography>
                            </Box>
                            <Box className="booking">
                              <Link
                                to={ROUTES.getBookingPage(singleStore.slug)}
                              >
                                <Button>Book Now</Button>
                              </Link>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Home;
