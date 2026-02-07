import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import DummyImage from "../../components/DummyImage/DummyImage";
import StarRating from "../../components/StarRating/StarRating";
import { useAuth } from "../../contexts/AuthContext";
import Address from "../../components/Address/Address";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Masonry from "@mui/lab/Masonry";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { ROUTES } from "../../routes";
import { saveRecentlyViewedStore } from "../../Utils/storeRecentlyViewed";
import { Helmet } from "react-helmet-async";
import { useSnackbar } from "../../contexts/SnackBarContext";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

function StorePage({ initialData }) {
  const { formatDate, user } = useAuth();
  const [activeTab, setActiveTab] = useState("photos");

  const { slug } = useParams();
  const navigate = useNavigate();
  const [storeDetails, setStoreDetails] = useState(() => {
    if (initialData) {
      return initialData;
    } else if (typeof window !== "undefined" && window.__INITIAL_DATA__) {
      return window.__INITIAL_DATA__.storeDetails;
    }
    return null;
  });
  const [loading, setLoading] = useState(!storeDetails);
  const [alertMessage, setAlertMessage] = useState("");
  const [isFav, setIsFav] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [MapComponents, setMapComponents] = useState(null);
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
      console.log("details not found");
      const fetchStoreDetails = async () => {
        console.log("fetching details");

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
          console.log("details fetched: ", data.storeDetails);
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
      console.log("data from window: ", window.__INITIAL_DATA__);
      console.log("data from state: ", storeDetails);
      delete window.__INITIAL_DATA__;
      console.log("removing data froms windows");
    }
  }, []);
  useEffect(() => {
    const defaultTab = getDefaultTab(storeDetails);
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [storeDetails]);
  const getDefaultTab = (storeDetails) => {
    if (storeDetails?.gallery?.length > 0) return "photos";
    if (storeDetails?.services?.length > 0) return "services";
    if (storeDetails?.workers?.length > 0) return "team_members";
    if (storeDetails?.reviews?.length > 0) return "reviews";
    if (
      storeDetails?.about ||
      storeDetails?.address ||
      (storeDetails?.lat && storeDetails?.lng)
    )
      return "about";

    return false; // no tabs available
  };
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
    if (storeDetails?.id) {
      saveRecentlyViewedStore(storeDetails);
    }
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
  const reviews =
    storeDetails?.reviews?.filter((review) => review.status === "active") || [];
  const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
  const averageRatingStore =
    reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";

  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "success");
    }
  }, [alertMessage]);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
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
        <Box className="store_detail_new">
          <Box
            className="store_banner"
            sx={{
              background: `url(${process.env.REACT_APP_IMG_URL}${storeDetails.thumbnail})`,
            }}
          >
            <Box className="overlay"></Box>
            <Box className="banner_content container">
              <Box className="store_name">
                <Typography variant="h2">{storeDetails.title}</Typography>
              </Box>
              {storeDetails.reviews?.length > 0 && (
                <Box className="rating">
                  <StarRating
                    rating={averageRatingStore}
                    color="#ffb200"
                    size="medium"
                  />
                  {storeDetails.reviews.length > 1
                    ? `${storeDetails.reviews.length} Reviews`
                    : "1 Review"}
                </Box>
              )}

              <Box className="timing">
                <Typography variant="body1">
                  {getTodayTiming(storeDetails.working_hours)}
                </Typography>
              </Box>
              <Box className="bookNow_btn">
                <Link
                  to={ROUTES.getBookingPage(storeDetails.slug)}
                  state={{ storeDetails: storeDetails }}
                >
                  <Button>Book Now</Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box className="store_details">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={activeTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Box className="container">
                    <TabList onChange={handleChange} className="store_tabs_ist">
                      {storeDetails.gallery?.length > 0 && (
                        <Tab label="Photos" value="photos" />
                      )}
                      {storeDetails.services?.length > 0 && (
                        <Tab label="Services" value="services" />
                      )}
                      {storeDetails.workers?.length > 0 && (
                        <Tab label="Team Members" value="team_members" />
                      )}
                      {storeDetails.reviews?.length > 0 && (
                        <Tab label="Reviews" value="reviews" />
                      )}
                      {(storeDetails.about ||
                        storeDetails.address ||
                        (storeDetails.lat && storeDetails.lng)) && (
                        <Tab label="About" value="about" />
                      )}
                    </TabList>
                  </Box>
                </Box>
                <Box className="container store_details_sides" display="flex">
                  <Box sx={{ width: "70%" }} className="store_details_left">
                    <TabPanel value="about">
                      <Box className="store_about">
                        <p>{storeDetails.about}</p>
                        <div className="map">
                          {storeDetails.lat &&
                            storeDetails.lng &&
                            typeof window !== "undefined" && (
                              <MapContainer
                                center={[storeDetails.lat, storeDetails.lng]}
                                zoom={15}
                                style={{ height: 500, width: "100%" }}
                              >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker
                                  position={[
                                    storeDetails.lat,
                                    storeDetails.lng,
                                  ]}
                                />
                              </MapContainer>
                            )}
                          <Address details={storeDetails} />
                        </div>
                      </Box>
                    </TabPanel>
                    <TabPanel value="services">
                      <Box className="store_services">
                        <Box className="service_title_btn">
                          <Typography variant="h3">Services</Typography>
                          {storeDetails.services?.length > 6 && (
                            <Link
                              to={ROUTES.getBookingPage(storeDetails.slug)}
                              state={{ storeDetails: storeDetails }}
                            >
                              <Button>
                                View All{" "}
                                <span className="badge">
                                  {storeDetails.services.length}
                                </span>
                              </Button>
                            </Link>
                          )}
                        </Box>
                        <Box className="services">
                          {storeDetails.services?.length > 0 &&
                            storeDetails.services
                              .slice(0, 6)
                              .map((singleSer, index) => (
                                <Box className="service" key={index}>
                                  <Box className="service_name">
                                    <Typography variant="h4">
                                      {singleSer.title}
                                    </Typography>
                                  </Box>
                                  <Box className="service_price_eta">
                                    <Typography variant="h5">
                                      {singleSer.price} {singleSer.currency}
                                    </Typography>
                                    <Typography variant="h6">
                                      {singleSer.eta}
                                    </Typography>
                                  </Box>
                                  <Box className="service_gender">
                                    <Typography variant="body1">
                                      {singleSer.gender
                                        ? `Only for ${singleSer.gender}`
                                        : "Available for all"}
                                    </Typography>
                                  </Box>
                                  <hr className="divider" />
                                  <Box className="service_book">
                                    <Link
                                      to={ROUTES.getBookingPage(
                                        storeDetails.slug,
                                      )}
                                      state={{
                                        storeDetails: storeDetails,
                                        service: singleSer,
                                      }}
                                    >
                                      <Button>Book Now</Button>
                                    </Link>
                                  </Box>
                                </Box>
                              ))}
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="team_members">
                      {/* Team members */}
                      <Box className="store_team">
                        <Box className="teamMember_title">
                          <Typography variant="h3">Team Members</Typography>
                        </Box>
                        <Box className="team_members_cards">
                          {storeDetails.workers?.length > 0 && (
                            storeDetails.workers.filter( (singleWorker) => singleWorker.user?.account_status === "active" ).map((singleWorker,index) => {
                              const reviews =
                                singleWorker?.user?.reviews_received || [];
                              const total = reviews.reduce(
                                (sum, r) => sum + parseFloat(r.rating || 0),
                                0
                              );
                              const averageRating =
                                reviews.length > 0
                                  ? (total / reviews.length).toFixed(1)
                                  : "";
                                  return (
                                    <div class="flip-card" key={index}>
                                    <div class="flip-card-inner">
                                      <div class="flip-card-front">
                                        {singleWorker.user.user_info.profile_image ? (
                                          <img
                                            src={`${process.env.REACT_APP_IMG_URL}${singleWorker.user.user_info.profile_image}`}
                                            alt=""
                                          />
                                        ) : (
                                          <div className="dummy_img">
                                            {singleWorker.user.username?.charAt(0) || "?"}
                                          </div>
                                        )}
                                      </div>
                                      <div class="flip-card-back">
                                        <Box className="member_name">
                                          <Typography variant="body1">
                                            {singleWorker.user.username}
                                          </Typography>
                                        </Box>
                                        <Box className="member_desig">
                                          <Typography variant="body1">{singleWorker.user.user_info.designation}</Typography>
                                        </Box>
                                        {averageRating && (
                                          <Box className="member_rating">
                                          <Typography variant="body1">{averageRating} <StarOutlinedIcon /></Typography>
                                        </Box>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  )
                            })
                          )}
                          
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="reviews">
                      {storeDetails?.reviews &&
                        storeDetails?.reviews?.length > 0 && (
                          <div className="reviews-div">
                            <h2>Our Happy Customers</h2>
                            <div className="reviews mt-3">
                              {storeDetails.reviews
                                ?.slice(0, 9)
                                .filter((review) => review.status === "active")
                                .map((singleReview) => (
                                  <div
                                    className="review"
                                    key={singleReview?.id}
                                  >
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
                                          <b>
                                            {singleReview.reviewer.username}
                                          </b>
                                        </p>
                                        <p className="time">
                                          {formatDate(singleReview.reviewed_at)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="rating">
                                      <StarRating
                                        rating={singleReview.rating}
                                        color="#7b7bfa"
                                      />
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
                                  to={ROUTES.getAllReviewPage(
                                    storeDetails.slug,
                                  )}
                                  state={{ storeDetails: storeDetails }}
                                >
                                  See more...
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                    </TabPanel>
                    <TabPanel value="photos">
                      <Masonry columns={{ xs: 2, md: 3 }} spacing={2}>
                        {storeDetails.gallery?.map((item, index) => (
                          <div key={index}>
                            <img
                              src={`${process.env.REACT_APP_IMG_URL}${item.image}`}
                              alt={storeDetails.title}
                              style={{
                                borderBottomLeftRadius: 4,
                                borderBottomRightRadius: 4,
                                display: "block",
                                width: "100%",
                              }}
                            />
                          </div>
                        ))}
                      </Masonry>
                    </TabPanel>
                  </Box>
                  {/* <hr /> */}
                  <Box sx={{ width: "30%" }} className="store_details_right">
                    <div
                      className="right_side"
                      style={{
                        width: "100%",
                        padding: "0px",
                        marginTop: "25px",
                      }}
                    >
                      <div className="opening-hours">
                        <h2>Working Hours</h2>
                        <ul style={{ width: "100%" }}>
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
                                    {singleHour.start_time_formatted} -{" "}
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
                      </div>
                    </div>
                  </Box>
                </Box>
              </TabContext>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default StorePage;
