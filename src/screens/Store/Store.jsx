import React, { useEffect, useState } from "react";
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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Box,
  CircularProgress,
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
import Slider from "react-slick";
import ReviewsSlider from "../../components/ReviewsSlider/ReviewsSlider";

function StorePage({ initialData }) {
  const { formatDate, user, token, updateFavorites } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loadingFav, setLoadingFav] = useState(false);
  const isBrowser = typeof window !== "undefined";
  const [storeDetails, setStoreDetails] = useState(() => {
    if(initialData) {
      return initialData;
    } else if (typeof window !== "undefined" && window.__INITIAL_DATA__) {
      return window.__INITIAL_DATA__.storeDetails;
    }
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
      // console.log("details not found");
      const fetchStoreDetails = async () => {
        // console.log("fetching details");
        
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
          // console.log("details fetched: ", data.storeDetails);
        } catch (error) {
          console.error("Failed to fetch store details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStoreDetails();
    }
  }, [storeDetails,slug]);
  useEffect(() => {
    if (window.__INITIAL_DATA__) {
      console.log("data from window: ", window.__INITIAL_DATA__);
      console.log("data from state: ", storeDetails);
      delete window.__INITIAL_DATA__;
      console.log("removing data froms windows");
    }
  }, []);
  useEffect(() => {
    if (
      storeDetails &&
      user &&
      Array.isArray(storeDetails.favourited_by_users)
    ) {
      const isUserFav = storeDetails.favourited_by_users.some(
        (singleFav) => singleFav?.id === user?.id
      );
      setIsFav(isUserFav);
    }
  }, [storeDetails, user]);
  useEffect(() => {
    if (storeDetails?.id) {
      saveRecentlyViewedStore(storeDetails);
    }
  }, [storeDetails]);
  const getTodayTiming = (workingHours) => {
    if (!Array.isArray(workingHours)) return null;

    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todayTiming = workingHours.find(
      (item) => item.day.toLowerCase() === today.toLowerCase()
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

    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

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

  const handleCopy = () => {
    const storeUrl = window.location.href;
    navigator.clipboard
      .writeText(storeUrl)
      .then(() => {
        setAlertMessage("Link copied to clipboard!");
        setTimeout(() => setAlertMessage(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleAddToFav = async () => {
    setLoadingFav(true);
    try {
      const payload = {
        store_id: storeDetails.id,
        user_id: user.id,
      };
      let data;
      if (isFav) {
        ({ data } = await axiosClient.post("removeFromFavourite", payload));
      } else {
        ({ data } = await axiosClient.post("addToFavourite", payload));
      }
      updateFavorites(data.favouriteStores);
      setAlertMessage(data.message);
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      setIsFav(!isFav);
    } catch (error) {
      console.error("Failed to add or remove to favourites", error);
    } finally {
      setLoadingFav(false);
    }
  };
  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "success");
    }
  }, [alertMessage]);
  if (!MapComponents) {
    return <div style={{ height: "400px", background: "#eee" }}>Loading map...</div>;
  }
  const { MapContainer, TileLayer, Marker} = MapComponents;
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
                    color: "#333333",
                    fontSize: "32px",
                    fontFamily: "Barlow",
                    fontWeight: "600",
                  }}
                >
                  {storeDetails.title}
                </Typography>
              </div>
              <div className="store_data_mobile">
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333333",
                    fontSize: "16px",
                  }}
                >
                  {storeDetails.type || "Saloon"} • 
                </Typography>
              </div>
              <div className="info_save_div">
                <div className="store_info">
                  <div className="rating">
                    <p>
                      <b>{averageRatingStore}</b>
                    </p>
                    <StarRating rating={averageRatingStore} />
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
                      <b>Get Directions</b>
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
                    <Tooltip title="Copy Link">
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
              <div
              className="container">
              <div className="two_sections">
                <div className="left_side">
                  <h2>Services</h2>
                  <div className="services_categories">
                    <div
                      className={`category ${
                        selectedCategory === null ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(null)}
                      style={{ cursor: "pointer" }}
                    >
                      All
                    </div>
                    {storeDetails?.services_categories?.length > 0 &&
                      storeDetails.services_categories
                        ?.filter((singleCat) => singleCat.status === "active")
                        .map((singleCat, index) => (
                          <div
                            key={index}
                            className={`category ${
                              selectedCategory === singleCat?.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedCategory(singleCat?.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {singleCat.title}
                          </div>
                        ))}
                  </div>

                  <div className="services">
                    {storeDetails?.services?.length > 0 && (
                      <>
                        {storeDetails.services
                          .filter((service) =>
                            selectedCategory
                              ? service.service_category_id === selectedCategory
                              : true && service.category?.status === "active"
                          )
                          .slice(0, 4)
                          .filter(
                            (service) =>
                              service.status === "active" &&
                              service.is_active_by_admin == 1
                          )
                          .map((singleSer) => (
                            <div className="service" key={singleSer.id}>
                              <div className="info">
                                <h4 className="title">{singleSer.title}</h4>
                                <Box display="flex" alignItems="center" gap="15px">
                                  <p className="eta"><AccessTimeIcon /> {singleSer.eta}</p>
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
                            : true
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
                  {/* {storeDetails.workers &&
                    storeDetails.workers?.length > 0 && (
                      <div className="teams_div">
                        <h2>Team</h2>
                        <div className="team_members">
                          {storeDetails.workers
                            .filter(
                              (worker) => worker.user?.account_status === "active"
                            )
                            .map((worker) => {
                              const reviews =
                                worker?.user?.reviews_received || [];
                              const total = reviews.reduce(
                                (sum, r) => sum + parseFloat(r.rating || 0),
                                0
                              );
                              const averageRating =
                                reviews.length > 0
                                  ? (total / reviews.length).toFixed(1)
                                  : "";

                              return (
                                <div
                                  className="single_member"
                                  key={worker.user?.id}
                                >
                                  <div
                                    className={`profile_img ${
                                      worker.user.user_info.profile_image
                                        ? ""
                                        : "no-img"
                                    }`}
                                  >
                                    {worker.user.user_info.profile_image ? (
                                      <img
                                        src={`${process.env.REACT_APP_IMG_URL}${worker.user.user_info.profile_image}`}
                                        alt=""
                                      />
                                    ) : (
                                      <div className="dummy_img">
                                        {worker.user.username?.charAt(0) || "?"}
                                      </div>
                                    )}
                                    <div className="name_des">
                                      <h3 className="username">
                                        {worker.user.username}
                                      </h3>
                                      <p className="designation">
                                        {worker.user.user_info.designation}
                                      </p>
                                    </div>
                                    {averageRating && (
                                      <div className="user_rating">
                                        {averageRating} <StarOutlinedIcon />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )} */}
                    {storeDetails.workers &&
                    storeDetails.workers?.length > 0 && (
                      <div className="teams_div_new">
                        <h2>Team</h2>
                        <div className="team_members new">
                          {storeDetails.workers
                            .filter(
                              (worker) => worker.user?.account_status === "active"
                            )
                            .map((worker) => {
                              const reviews =
                                worker?.user?.reviews_received || [];
                              const total = reviews.reduce(
                                (sum, r) => sum + parseFloat(r.rating || 0),
                                0
                              );
                              const averageRating =
                                reviews.length > 0
                                  ? (total / reviews.length).toFixed(1)
                                  : "";

                              return (
                                <div
                                  className="single_member"
                                  key={worker.user?.id}
                                >
                                  <div
                                    className={`profile_img ${
                                      worker.user.user_info.profile_image
                                        ? ""
                                        : "no-img"
                                    }`}
                                  >
                                    {worker.user.user_info.profile_image ? (
                                      <img
                                        src={`${process.env.REACT_APP_IMG_URL}${worker.user.user_info.profile_image}`}
                                        alt=""
                                      />
                                    ) : (
                                      <div className="dummy_img">
                                        {worker.user.username?.charAt(0) || "?"}
                                      </div>
                                    )}
                                    {/* <dov className="overlay"></dov>
                                    <div className="name_des">
                                      <h3 className="username">
                                        {worker.user.username}
                                      </h3>
                                      <p className="designation">
                                        {worker.user.user_info.designation}
                                      </p>
                                      {averageRating && (
                                        <div className="user_rating">
                                          {averageRating} <StarOutlinedIcon />
                                        </div>
                                      )}
                                    </div> */}
                                  </div>
                                  <h3 className="username">
                                    {worker.user.username}
                                  </h3>
                                  <p className="designation">
                                    {worker.user.user_info.designation}
                                  </p>
                                  {averageRating && (
                                    <div className="worker_rating">
                                      <StarOutlinedIcon /> {averageRating}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  {/* {storeDetails?.reviews && storeDetails?.reviews?.length > 0 && (
                    <div className="reviews-div mt-5">
                      <h2>Reviews</h2>
                      <div className="reviews">
                        {storeDetails.reviews
                          ?.slice(0, 9)
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
                                      username={singleReview.reviewer.username}
                                    />
                                  )}
                                </div>
                                <div className="user-name-time">
                                  <p className="username">
                                    <b>{singleReview.reviewer.username}</b>
                                  </p>
                                  <p className="time">
                                    {formatDate(singleReview.reviewed_at)}
                                  </p>
                                </div>
                              </div>
                              <div className="rating">
                                <StarRating rating={singleReview.rating} />
                              </div>
                              <div className="review-text">
                                <p>{singleReview.review}</p>
                              </div>
                            </div>
                          ))}
                      </div>

                      {storeDetails.reviews?.length > 9 && (
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
                  )} */}
                  
                </div>
                <div className="right_side">
                  <div className="padding">
                    <div className={`store-info ${isScrolled ? "visible" : ""}`}>
                      <h2>{storeDetails.title}</h2>

                      <div className="rating">
                        <p>
                          <b>{averageRatingStore}</b>
                        </p>

                        <StarRating rating={averageRatingStore} />

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
                      <b>{getTodayTiming(storeDetails.working_hours)}</b>
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
            
                <div className="bottom_side">
                  <ReviewsSlider reviews={storeDetails.reviews} />
                  <div className="container">
                  {user &&
                    token &&
                    user?.id != storeDetails.user_id &&
                    !storeDetails.workers?.some(
                      (worker) => worker.user?.id == user?.id
                    ) && (
                      <div className="add_review">
                        <AddReviewForm
                          storeId={storeDetails?.id}
                          userId={user?.id}
                          onSubmit={handleAddReview}
                          storeUsers={storeDetails.workers}
                        />
                      </div>
                    )}

                  <div className="about mt-5">
                    <h2>About</h2>
                    <p>{storeDetails.about}</p>
                    <div className="map">
                      {storeDetails.lat && storeDetails.lng && typeof window !== "undefined" && (
                        <MapContainer
                          center={[storeDetails.lat, storeDetails.lng]}
                          zoom={15}
                          style={{ height: 500, width: "100%" }}
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
                  <div className="opening-hours mt-5">
                    <h2>Opening Hours</h2>
                    <ul>
                      {storeDetails?.working_hours &&
                        storeDetails?.working_hours?.length > 0 &&
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
                                <circle cx="7.5" cy="8" r="7.5" fill="#D8A7B1" />
                              </svg>
                              <p>{singleHour.day}</p>
                            </div>
                            <div>
                              <p>
                                {singleHour.start_time_formatted} -{" "}
                                {singleHour.end_time_formatted}{" "}
                                {singleHour.is_closed !== "active" ? (
                                  <strong style={{ color: "red" }}>Closed</strong>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  </div>
                </div>
          </Box>
        </>
      )}
    </>
  );
}

export default StorePage;