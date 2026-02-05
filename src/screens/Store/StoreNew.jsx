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
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Badge,
  Box,
  Button,
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
  const [activeTab, setActiveTab] = useState("1");

  const { slug } = useParams();
  const navigate = useNavigate();
  const [loadingFav, setLoadingFav] = useState(false);
  const isBrowser = typeof window !== "undefined";
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
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
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
              background: `url(http://127.0.0.1:8000/storage//thumbnails/3UpeT36WJGKaP8vpkbw93xXbWbkYUlzCmBLUJcUV.jpg)`,
            }}
          >
            <Box className="overlay"></Box>
            <Box className="banner_content container">
              <Box className="store_name">
                <Typography variant="h2">Store_Name</Typography>
              </Box>
              <Box className="rating">
                <StarRating rating={5} color="#ffb200" size="medium" />
                255 Review
              </Box>
              <Box className="timing">
                <Typography variant="body1">
                  Timing 9:00 AM to 10:00 PM Open
                </Typography>
              </Box>
              <Box className="bookNow_btn">
                <Link>
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
                    <TabList onChange={handleChange}>
                      <Tab label="About" value="1" />
                      <Tab label="Services" value="2" />
                      <Tab label="Team Members" value="3" />
                      <Tab label="Reviews" value="4" />
                      <Tab label="Photos" value="5" />
                    </TabList>
                  </Box>
                </Box>
                <Box className="container">
                  <TabPanel value="1">
                    About
                    {/* <Box className="store_about">
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
                                position={[storeDetails.lat, storeDetails.lng]}
                              />
                            </MapContainer>
                          )}
                        <Address details={storeDetails} />
                      </div>
                    </Box> */}
                  </TabPanel>
                  <TabPanel value="2">
                    Services
                    {/* <Box className="store_services">
                      <Box className="service_title_btn">
                        <Typography variant="body1">Services</Typography>
                        <Link>
                          <Badge badgeContent={4} color="secondary">
                            <Button>View All</Button>
                          </Badge>
                        </Link>
                      </Box>
                      <Box className="services">
                        <Box className="service">

                        </Box>
                      </Box>
                    </Box> */}
                  </TabPanel>
                  <TabPanel value="3">Team Members</TabPanel>
                  <TabPanel value="4">Reviews</TabPanel>
                  <TabPanel value="5">Photos</TabPanel>
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
