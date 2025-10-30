import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes";
import axiosClient from "../../axios-client";
import SkeletonHome from "../../components/Loader/SkeletonHome";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarRating from "../../components/StarRating/StarRating";
import { getRecentlyViewedStores } from "../../Utils/storeRecentlyViewed";
import { Helmet } from "react-helmet-async";
import { useSnackbar } from "../../contexts/SnackBarContext";
import StoreCard from "../../components/StoreCard/StoreCard";

const isBrowser = typeof window !== "undefined";
function Home() {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || ""
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

  const reivewsSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const categoriesSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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
                  src={`${process.env.REACT_APP_BASE_URL}/new-banner-bg.webp`}
                  alt=""
                />
              </Box>
              <Box className="bubble_section">
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
                    {/* <img src={`${process.env.REACT_APP_BASE_URL}/test.png`} alt="" /> */}
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
                    <Link style={{ width: "fit-content" }}>
                      <Button variant="contained">Explore Now</Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <div className="background-gradient"></div> */}
          </Box>
          {categories && categories.length > 0 && (
            <Box className="categories_section">
              <Box className="container">
                <Typography variant="h2">Search by category</Typography>
                <Box className="categories">
                  {categories.map((singleCategory) => (
                    <Box className="category" key={singleCategory.id}>
                      <Link to={ROUTES.getCategoryPage(singleCategory.slug)}>
                        <Box className="cat_image">
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}/${singleCategory.thumbnail}`}
                            alt=""
                          />
                        </Box>
                        <Box className="cat_name">
                          <Typography variant="h3">
                            {singleCategory.title}
                          </Typography>
                        </Box>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
          {categories && categories.length > 0 && (
            <Box className="categories_section mobile">
              <Box className="container">
                <Typography variant="h2">Search by category</Typography>
                <Box className="categories">
                  <Slider {...categoriesSliderSettings}>
                    {categories.map((singleCategory) => (
                      <Box className="category" key={singleCategory.id}>
                        <Link to={ROUTES.getCategoryPage(singleCategory.slug)}>
                          <Box className="cat_image">
                            <img
                              src={`${process.env.REACT_APP_IMG_URL}/${singleCategory.thumbnail}`}
                              alt=""
                            />
                          </Box>
                          <Box className="cat_name">
                            <Typography variant="h3">
                              {singleCategory.title}
                            </Typography>
                          </Box>
                        </Link>
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </Box>
            </Box>
          )}
          {stores?.new?.length > 0 && (
            <Box className="stores_section new_stores">
              <Box className="container">
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                    fontFamily: "Barlow",
                    fontWeight: "600",
                    color: "#333333",
                    textAlign: "center",
                  }}
                >
                  New to Site
                </Typography>
                <hr />
                <Box className="stores">
                  {stores.new.map((singleStore) => (
                    <StoreCard storeDetails={singleStore} />
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          <Box className="second_banner new_banner">
            
            <Box className="content" sx={{ zIndex: "1", position: "relative" }}>
              <Box className="overlay"></Box>
              <Box className="bg_img">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/new-banner-2-bg.webp`}
                  alt=""
                />
              </Box>
              <Box className="bubble_section">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bubble" />
                  ))}
              </Box>
              <Box className="container">
                <Box className="banner_content">
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
                    <Link style={{ width: "fit-content" }}>
                      <Button variant="contained">Explore Now</Button>
                    </Link>
                  </Box>
                  <Box className="image">
                    {/* <img src={`${process.env.REACT_APP_BASE_URL}/bubble.png`} alt="" /> */}
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <div className="background-gradient"></div> */}
          </Box>
          {/* {categories && categories.length > 6 && (
            <Box className="categories_section">
              <Typography variant="h2">our collections</Typography>
              <Box className="container">
                <Box className="categories">
                  {categories.slice(6).map((singleCategory) => (
                    <Box className="category">
                      <Link>
                        <Box className="cat_image">
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}/${singleCategory.thumbnail}`}
                            alt=""
                          />
                        </Box>
                        <Box className="cat_name">
                          <Typography variant="h3">
                            {singleCategory.title}
                          </Typography>
                        </Box>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )} */}
          {/* <Box className="top_stores">
            <Box className="container">
              <Box className="stores">
                <Box className="store">
                  <img src="http://127.0.0.1:8000/storage/thumbnails/DxA6SIKtV5BMZQzMLEwxL3sZajybQdGyGwNJtiU9.jpg" alt="" />
                  <Box className="overlay"></Box>
                  <Box className="store_content">
                    <Typography variant="h4">Store type</Typography>
                    <Typography variant="h2">Store name</Typography>
                    <Link>
                      <Button variant="contained">Visit</Button>
                    </Link>
                  </Box>
                </Box>
                <Box className="store">
                  <img src="http://127.0.0.1:8000/storage/thumbnails/DxA6SIKtV5BMZQzMLEwxL3sZajybQdGyGwNJtiU9.jpg" alt="" />
                  <Box className="overlay"></Box>
                  <Box className="store_content">
                    <Typography variant="h4">Store type</Typography>
                    <Typography variant="h2">Store name</Typography>
                    <Link>
                      <Button variant="contained">Visit</Button>
                    </Link>
                  </Box>
                </Box>
                <Box className="store">
                  <img src="http://127.0.0.1:8000/storage/thumbnails/DxA6SIKtV5BMZQzMLEwxL3sZajybQdGyGwNJtiU9.jpg" alt="" />
                  <Box className="overlay"></Box>
                  <Box className="store_content">
                    <Typography variant="h4">Store type</Typography>
                    <Typography variant="h2">Store name</Typography>
                    <Link>
                      <Button variant="contained">Visit</Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box> */}
          {stores?.trending?.length > 0 && (
            <Box className="stores_section trending_stores">
              <Box className="container">
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "32px",
                    fontFamily: "Barlow",
                    fontWeight: "600",
                    color: "#333333",
                    textAlign: "center",
                  }}
                >
                  Treandy Saloons and Spa's
                </Typography>
                <hr />
                <Box className="stores">
                  {stores.trending.map((singleStore) => (
                    <StoreCard storeDetails={singleStore} />
                  ))}
                </Box>
              </Box>
            </Box>
          )}
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
