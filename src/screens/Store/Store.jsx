import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import Seperator from "../../components/Seperator/Seperator";
import CustomGallery from "../../components/CustomGallery/CustomGallery";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import DummyImage from "../../components/DummyImage/DummyImage";
import StarRating from "../../components/StarRating/StarRating";
import { useAuth } from "../../contexts/AuthContext";
import AddReviewForm from "../../components/AddReviewForm/AddReviewForm";
import Address from "../../components/Address/Address";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-indiana-drag-scroll/dist/style.css";
import {
  Box,
  CircularProgress,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ROUTES } from "../../routes";
import { saveRecentlyViewedStore } from "../../Utils/storeRecentlyViewed";
import { Helmet } from "react-helmet-async";
import { useSnackbar } from "../../contexts/SnackBarContext";
import ReviewsSlider from "../../components/ReviewsSlider/ReviewsSlider";
import ScrollContainer from "react-indiana-drag-scroll";

function StorePage({ initialData }) {
  const { formatDate, user, token, updateFavorites } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loadingFav, setLoadingFav] = useState(false);
  const scrollRef = useRef(null);
  const rightSideRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const [storeDetails, setStoreDetails] = useState(() => {
    if (initialData) return initialData;
    else if (typeof window !== "undefined" && window.__INITIAL_DATA__)
      return window.__INITIAL_DATA__.storeDetails;
    return null;
  });
  const [loading, setLoading] = useState(!storeDetails);
  const [alertMessage, setAlertMessage] = useState("");
  const [isFav, setIsFav] = useState(false);
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [MapComponents, setMapComponents] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        import("leaflet"),
        import("react-leaflet"),
        import("leaflet/dist/leaflet.css"),
      ]).then(([L, ReactLeaflet]) => {
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        setMapComponents(ReactLeaflet);
      });
    }
  }, []);

  useEffect(() => {
    if (!storeDetails || slug !== storeDetails.slug) {
      const fetchStoreDetails = async () => {
        setLoading(true);
        try {
          const { data } = await axiosClient.get(`/getStoreBySlug/${slug}`);
          if (
            data.storeDetails.status !== "active" &&
            user?.user_info?.role !== "master-admin"
          ) {
            navigate(ROUTES.home);
          }
          setStoreDetails(data.storeDetails);
        } catch (error) {
          console.error("Failed to fetch store details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStoreDetails();
    }
  }, [storeDetails, slug]);

  useEffect(() => {
    if (window.__INITIAL_DATA__) {
      delete window.__INITIAL_DATA__;
    }
  }, []);

  useEffect(() => {
    if (
      storeDetails &&
      user &&
      Array.isArray(storeDetails.favourited_by_users)
    ) {
      const isUserFav = storeDetails.favourited_by_users.some(
        (singleFav) => singleFav?.id === user?.id,
      );
      setIsFav(isUserFav);
    }
  }, [storeDetails, user]);

  useEffect(() => {
    if (storeDetails?.id) saveRecentlyViewedStore(storeDetails);
  }, [storeDetails]);


  useEffect(() => {
    if (!rightSideRef.current) return;

    const handleScroll = () => {
      const top = rightSideRef.current?.getBoundingClientRect().top ?? 0;
      setIsSticky(top <= 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [storeDetails]);

  const getTodayTiming = (workingHours) => {
    if (!Array.isArray(workingHours)) return null;
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todayTiming = workingHours.find(
      (item) => item.day.toLowerCase() === today.toLowerCase(),
    );
    const timing = todayTiming || workingHours[0];
    if (!timing) return null;
    const {
      start_time_formatted,
      end_time_formatted,
      start_time,
      end_time,
      is_closed,
    } = timing;
    const now = new Date();
    const [startHour, startMinute] = start_time.split(":").map(Number);
    const [endHour, endMinute] = end_time.split(":").map(Number);
    const startTime = new Date(now);
    startTime.setHours(startHour, startMinute, 0, 0);
    const endTime = new Date(now);
    endTime.setHours(endHour, endMinute, 0, 0);
    if (endTime <= startTime) endTime.setDate(endTime.getDate() + 1);
    const isWithinTime = now >= startTime && now <= endTime;
    const isActuallyOpen = is_closed === "active" && isWithinTime;
    return (
      <span>
        Timing {start_time_formatted} to {end_time_formatted}{" "}
        {isActuallyOpen ? (
          <strong style={{ color: "green" }}>Open</strong>
        ) : (
          <strong style={{ color: "red" }}>Closed</strong>
        )}
      </span>
    );
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddReview = async (reviewData) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("addReview", reviewData);
      setStoreDetails(data.storeDetails);
    } catch (error) {
      console.error("Failed to fetch store details:", error);
    } finally {
      setLoading(false);
    }
  };

  const reviews =
    storeDetails?.reviews?.filter((review) => review.status === "active") || [];
  const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
  const averageRatingStore =
    reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";

  // Share using Web Share API, fallback to clipboard
  const handleCopy = async () => {
    const storeUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: storeDetails?.title || "Check this out",
          text: `Check out ${storeDetails?.title} on BeautyTrafic`,
          url: storeUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(storeUrl).then(() => {
        setAlertMessage("Link copied to clipboard!");
        setTimeout(() => setAlertMessage(""), 2000);
      });
    }
  };

  // Share to friend button handler
  const handleShareToFriend = async () => {
    const storeUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: storeDetails?.title,
          text: `Hey! I found this amazing place — ${storeDetails?.title}. Check it out!`,
          url: storeUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(storeUrl).then(() => {
        showSnackbar("Link copied! Share it with your friend.", "success");
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToFav = async () => {
    setLoadingFav(true);
    try {
      const payload = { store_id: storeDetails.id, user_id: user.id };
      let data;
      if (isFav) {
        ({ data } = await axiosClient.post("removeFromFavourite", payload));
      } else {
        ({ data } = await axiosClient.post("addToFavourite", payload));
      }
      updateFavorites(data.favouriteStores);
      setAlertMessage(data.message);
      setTimeout(() => setAlertMessage(""), 2000);
      setIsFav(!isFav);
    } catch (error) {
      console.error("Failed to add or remove to favourites", error);
    } finally {
      setLoadingFav(false);
    }
  };

  useEffect(() => {
    if (alertMessage) showSnackbar(alertMessage, "success");
  }, [alertMessage]);

  // Scroll categories left/right
  const scrollCategories = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current.getElement
        ? scrollRef.current.getElement()
        : scrollRef.current;
      container.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  if (!MapComponents) {
    return (
      <div style={{ height: "400px", background: "#eee" }}>Loading map...</div>
    );
  }
  const { MapContainer, TileLayer, Marker } = MapComponents;

  return (
    <>
      <Helmet>
        <title>
          {storeDetails
            ? `${storeDetails.title} - BeautyTrafic`
            : "BeautyTrafic"}
        </title>
        <meta
          name="description"
          content={
            storeDetails
              ? storeDetails.about
              : "Discover top salons on BeautyTrafic"
          }
        />
      </Helmet>
      {loading || !storeDetails ? (
        <Box>
          <div
            className="container"
            style={{ background: "transparent", paddingBlock: "20px" }}
          >
            <div className="skeleton-title">
              <Skeleton variant="text" width={300} height={40} />
            </div>
            <div className="skeleton-address">
              <Skeleton variant="text" width={150} height={40} />
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={150} height={40} />
            </div>
            <div className="skeleton-info">
              <Skeleton variant="rectangular" width="100%" height={150} />
            </div>
            <div className="skeleton-gallery">
              <Skeleton variant="rectangular" width="100%" height={200} />
            </div>
            <div className="skeleton-services">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width="100%"
                  height={100}
                  style={{ margin: "10px 0" }}
                />
              ))}
            </div>
          </div>
        </Box>
      ) : (
        <>
          {isMobile && (
            <div className="gallery-mobile">
              <CustomGallery
                images={storeDetails.gallery}
                thumbnail={storeDetails.thumbnail}
              />
            </div>
          )}
          <Box className="storeNew">
            <div
              className="container"
              style={{ background: "transparent", paddingBlock: "20px" }}
            >
              <div className="store_title">
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "32px",
                  }}
                >
                  {storeDetails.title}
                </Typography>
              </div>
              <div className="store_data_mobile">
                <div className="storeMeta">
                  <Typography
                    variant="body1"
                    sx={{ color: "#333333", fontSize: "16px" }}
                  >
                    {storeDetails.type || "Saloon"}
                  </Typography>
                  {storeDetails.reviews && (
                    <>
                      •
                      <div className="rating">
                        <StarOutlinedIcon /> {averageRatingStore}
                        <span>({storeDetails.reviews.length})</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="address">
                  <p>{storeDetails.address}</p>
                </div>
                <div className="storeAbout">
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#333333",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    About
                  </Typography>
                  <div
                    className={`about_wrapper ${expanded ? "expanded" : ""}`}
                  >
                    <p>{storeDetails.about}</p>
                    <span
                      className="read_more"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Read Less" : "Read More"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="info_save_div">
                <div className="store_info">
                  <div className="rating">
                    <p>{averageRatingStore}</p>
                    <StarRating rating={averageRatingStore} color="gold" />
                  </div>
                  <Seperator />
                  <div className="timing">
                    <p>{getTodayTiming(storeDetails.working_hours)}</p>
                  </div>
                  <Seperator />
                  <div className="address">
                    <p>{storeDetails.address}</p>
                  </div>
                  <Seperator />
                  <div className="get-dir-btn">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${storeDetails.lat},${storeDetails.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
                <div className="save_share">
                  {user && token && (
                    <>
                      {loadingFav && <CircularProgress size="20px" />}
                      <div className="save" onClick={handleAddToFav}>
                        {isFav ? (
                          <Tooltip title="Remove from favourites">
                            <FavoriteOutlinedIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Add to favourites">
                            <FavoriteBorderOutlinedIcon />
                          </Tooltip>
                        )}
                      </div>
                    </>
                  )}
                  <div className="share" onClick={handleCopy}>
                    <Tooltip title="Share">
                      <ReplyAllOutlinedIcon />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            {!isMobile && (
              <div className="gallery">
                <CustomGallery
                  images={storeDetails.gallery}
                  thumbnail={storeDetails.thumbnail}
                  slug={storeDetails.slug}
                />
              </div>
            )}

            <div className="container">
              <div className="two_sections">
                {/* LEFT SIDE */}
                <div className="left_side">
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: "400", fontSize: "30px" }}
                  >
                    Services
                  </Typography>
                  {/* Categories scroll with arrows */}
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => scrollCategories("left")}
                      sx={{
                        flexShrink: 0,
                        border: "1px solid #e0e0e0",
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                        background: "#fff",
                        "&:hover": { background: "#f5f5f5" },
                      }}
                    >
                      <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                    </IconButton>

                    <ScrollContainer
                      ref={scrollRef}
                      className="services_categories_scroll services_categories"
                      style={{ flex: 1, overflow: "hidden" }}
                    >
                      {storeDetails?.services_categories
                        ?.filter((singleCat) => singleCat.status === "active")
                        .map((singleCat) => (
                          <div
                            key={singleCat.id}
                            className={`category ${selectedCategory === singleCat?.id ? "active" : ""}`}
                            onClick={() => setSelectedCategory(singleCat?.id)}
                          >
                            {singleCat.title}
                          </div>
                        ))}
                    </ScrollContainer>

                    <IconButton
                      size="small"
                      onClick={() => scrollCategories("right")}
                      sx={{
                        flexShrink: 0,
                        border: "1px solid #e0e0e0",
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                        background: "#fff",
                        "&:hover": { background: "#f5f5f5" },
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>

                  <div className="services">
                    {storeDetails?.services?.length > 0 && (
                      <>
                        {storeDetails.services
                          .filter((service) =>
                            selectedCategory
                              ? service.service_category_id === selectedCategory
                              : true && service.category?.status === "active",
                          )
                          .slice(0, 8)
                          .filter(
                            (service) =>
                              service.status === "active" &&
                              service.is_active_by_admin == 1,
                          )
                          .map((singleSer) => (
                            <div className="service" key={singleSer.id}>
                              <div className="info">
                                <h4 className="title">{singleSer.title}</h4>
                                <Box
                                  className="service_meta"
                                  display="flex"
                                  alignItems="center"
                                  gap="15px"
                                >
                                  <p className="eta">
                                    <AccessTimeIcon /> {singleSer.eta}
                                  </p>
                                  <p className={`gender ${singleSer.gender}`}>
                                    {singleSer.gender &&
                                      `Only for ${singleSer.gender}`}
                                  </p>
                                </Box>
                              </div>
                              <div className="book_btn">
                                <p className="price">
                                  {singleSer.currency} {singleSer.price}
                                </p>
                                <Link
                                  to={ROUTES.getBookingPage(storeDetails.slug)}
                                  state={{
                                    storeDetails: storeDetails,
                                    service: singleSer,
                                  }}
                                >
                                  <button>Book</button>
                                </Link>
                              </div>
                            </div>
                          ))}

                        {storeDetails.services.filter((service) =>
                          selectedCategory
                            ? service.category_id === selectedCategory
                            : true,
                        ).length > 4 && (
                          <div className="see-all-btn">
                            <Link
                              to={ROUTES.getBookingPage(storeDetails.slug)}
                              state={{ storeDetails: storeDetails }}
                            >
                              <button>See All</button>
                            </Link>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Team section */}
                  {storeDetails.workers && storeDetails.workers?.length > 0 && (
                    <div className="teams_div_new">
                      <h2>Team</h2>
                      <div className="team_members new">
                        {storeDetails.workers
                          .filter(
                            (worker) =>
                              worker.user?.account_status === "active",
                          )
                          .map((worker) => {
                            const wReviews =
                              worker?.user?.reviews_received || [];
                            const wTotal = wReviews.reduce(
                              (sum, r) => sum + parseFloat(r.rating || 0),
                              0,
                            );
                            const averageRating =
                              wReviews.length > 0
                                ? (wTotal / wReviews.length).toFixed(1)
                                : "";
                            return (
                              <div
                                className="single_member"
                                key={worker.user?.id}
                              >
                                <div
                                  className={`profile_img ${worker.user.user_info.profile_image ? "" : "no-img"}`}
                                >
                                  {worker.user.user_info.profile_image ? (
                                    <img
                                      src={`${process.env.REACT_APP_IMG_URL}${worker.user.user_info.profile_image}`}
                                      alt=""
                                    />
                                  ) : (
                                    <p className="dummy_img">
                                      {worker.user.username?.charAt(0) || "?"}
                                    </p>
                                  )}
                                  {averageRating && (
                                    <div
                                      className={`worker_rating ${worker.user.user_info.gender}`}
                                    >
                                      <StarOutlinedIcon /> {averageRating}
                                    </div>
                                  )}
                                </div>
                                <div className="worker_info">
                                  <h3 className="username">
                                    {worker.user.username}
                                  </h3>
                                  <p className="designation">
                                    {worker.user.user_info.designation}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* <ReviewsSlider reviews={storeDetails.reviews} /> */}
                  <Box>
                    {storeDetails?.reviews &&
                      storeDetails?.reviews?.length > 0 && (
                        <div className="reviews-div">
                          <h2>Customer Reviews</h2>
                          <StarRating
                            size="large"
                            color="gold"
                            rating={averageRatingStore}
                          />
                          <Typography
                            variant="body1"
                            sx={{ marginBottom: "20px", fontSize: "18px" }}
                          >
                            {averageRatingStore} out of 5 based on{" "}
                            {reviews.length} reviews
                          </Typography>
                          <div className="reviews mt-3">
                            {storeDetails.reviews
                              ?.slice(0, 6)
                              .filter((review) => review.status === "active")
                              .map((singleReview) => (
                                <div className="review" key={singleReview?.id}>
                                  <div className="user_info">
                                    <div className="user_img">
                                      {singleReview.reviewer.user_info &&
                                      singleReview.reviewer.user_info
                                        .profile_image ? (
                                        <img
                                          src={`${process.env.REACT_APP_IMG_URL}${singleReview.reviewer.user_info.profile_image}`}
                                          alt=""
                                        />
                                      ) : (
                                        <DummyImage
                                          username={
                                            singleReview.reviewer.username
                                          }
                                        />
                                      )}
                                    </div>
                                    <div className="user-name-time">
                                      <p className="username">
                                        {singleReview.reviewer.username}
                                      </p>
                                      <p className="time">
                                        {formatDate(singleReview.reviewed_at)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="rating">
                                    <StarRating
                                      rating={singleReview.rating}
                                      color="gold"
                                    />
                                  </div>
                                  <div className="review-text">
                                    <p>{singleReview.review}</p>
                                  </div>
                                </div>
                              ))}
                          </div>

                          {storeDetails.reviews?.length > 6 && (
                            <div className="see_all_reviews_btn_div mt-3">
                              <Link
                                to={ROUTES.getAllReviewPage(storeDetails.slug)}
                                state={{ storeDetails: storeDetails }}
                              >
                                See more...
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                  </Box>
                  {user &&
                    token &&
                    user?.id != storeDetails.user_id &&
                    !storeDetails.workers?.some(
                      (worker) => worker.user?.id == user?.id,
                    ) && (
                      <div className="add_review mt-4">
                        <AddReviewForm
                          storeId={storeDetails?.id}
                          userId={user?.id}
                          onSubmit={handleAddReview}
                          storeUsers={storeDetails.workers}
                        />
                      </div>
                    )}

                  {/* About */}
                  <div className="about about-desktop mt-5">
                    <h2>About</h2>
                    <p className="store_about">{storeDetails.about}</p>
                    <div className="map">
                      {storeDetails.lat &&
                        storeDetails.lng &&
                        typeof window !== "undefined" && (
                          <MapContainer
                            center={[storeDetails.lat, storeDetails.lng]}
                            zoom={15}
                            className="store_map"
                            scrollWheelZoom={false}
                            dragging={false}
                            doubleClickZoom={false}
                            touchZoom={false}
                          >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                              position={[storeDetails.lat, storeDetails.lng]}
                            />
                          </MapContainer>
                        )}
                      <Address details={storeDetails} />
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="opening-hours mt-5">
                    <h2>Business Hours</h2>
                    <ul>
                      {storeDetails?.working_hours?.length > 0 &&
                        storeDetails.working_hours.map((singleHour) => (
                          <li key={singleHour.id}>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                              >
                                <circle
                                  cx="7.5"
                                  cy="8"
                                  r="7.5"
                                  fill="#D8A7B1"
                                />
                              </svg>
                              <p>{singleHour.day}</p>
                            </div>
                            <div>
                              <p>
                                {singleHour.start_time_formatted} –{" "}
                                {singleHour.end_time_formatted}{" "}
                                {singleHour.is_closed !== "active" ? (
                                  <strong style={{ color: "red" }}>
                                    Closed
                                  </strong>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>

                    {/* Share to friend button */}
                    <button
                      onClick={handleShareToFriend}
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        border: "1px solid #D8A7B1",
                        borderRadius: "10px",
                        background: "transparent",
                        color: "#333",
                        fontSize: "15px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#D8A7B1";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#333";
                      }}
                    >
                      <IosShareIcon sx={{ fontSize: 18 }} />
                      Refer a Friend
                    </button>
                  </div>
                </div>

                <div
                  className="right_side"
                  ref={rightSideRef}
                  style={{
                    position: "sticky",
                    top: "140px",
                    right: 0,
                  }}
                >
                  <div className="padding">
                    <div
                      className={`store-info ${isScrolled ? "visible" : ""}`}
                    >
                      <h2>{storeDetails.title}</h2>
                      <div className="rating">
                        <p>{averageRatingStore}</p>
                        <StarRating rating={averageRatingStore} color="gold" />
                        <span>({storeDetails?.reviews?.length})</span>
                      </div>
                    </div>
                    <div className="book_now_btn">
                      <Link
                        to={ROUTES.getBookingPage(storeDetails.slug)}
                        state={{ storeDetails: storeDetails }}
                      >
                        <button className="book_now">Book Now</button>
                      </Link>
                    </div>
                  </div>
                  <hr className="seperator" />
                  <div className="padding">
                    <div className="time">
                      <AccessTimeOutlinedIcon />
                      {getTodayTiming(storeDetails.working_hours)}
                    </div>
                    <div className="location mt-3">
                      <div className="mt-2">
                        <RoomOutlinedIcon />
                      </div>
                      <Address details={storeDetails} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom_side removed — content moved to left_side above */}
          </Box>
        </>
      )}
    </>
  );
}

export default StorePage;
