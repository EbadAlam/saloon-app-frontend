import React, { useEffect, useRef, useState } from "react";
import BackComponent from "../../components/BackComponent/BackComponent";
import { useLocation, useParams } from "react-router-dom";
import { ROUTES } from "../../routes";
import {
  Box,
  Checkbox,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DummyImage from "../../components/DummyImage/DummyImage";
import { useAuth } from "../../contexts/AuthContext";
import StarRating from "../../components/StarRating/StarRating";
import StarIcon from "@mui/icons-material/Star";
import axiosClient from "../../axios-client";
import Loader from "../../components/Loader/Loader";

function AllReviewsPage() {
  const { state } = useLocation();
  const { slug } = useParams();
  const [storeDetails, setStoreDetails] = useState(state?.storeDetails || null);
  const [loading, setLoading] = useState(!state?.storeDetails);
  const [sortBy, setSortBy] = useState("latest");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const { formatDate } = useAuth();
  const filterRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/getStoreBySlug/${slug}`);
        setStoreDetails(data.storeDetails);
      } catch (error) {
        console.error("Failed to fetch store details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!storeDetails && slug) {
      fetchStoreDetails();
    }
  }, [storeDetails, slug]);
  if (loading || !storeDetails) {
    return <Loader />;
  }

  const reviews = storeDetails.reviews || [];
  const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
  const averageRatingStore =
    reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  const totalReviews = reviews.length;

  const ratingCounts = [5, 4, 3, 2, 1].map((value) => ({
    value,
    count: reviews.filter((review) => Math.round(review.rating) === value)
      .length,
  }));

  const handleRatingFilterChange = (value) => {
    setSelectedRatings((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  const filteredReviews = reviews
    .filter((review) =>
      selectedRatings.length === 0
        ? true
        : selectedRatings.includes(Math.round(review.rating)),
    )
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.reviewed_at) - new Date(a.reviewed_at);
      }
      if (sortBy === "best") {
        return b.rating - a.rating;
      }
      if (sortBy === "worst") {
        return a.rating - b.rating;
      }
      return 0;
    });
  return (
    <Box className="all-reviews-container">
      <BackComponent fallback={ROUTES.getStoreFrontPage(storeDetails.slug)} />
      <Box
        display="flex"
        alignItems="start"
        gap="50px"
        className="all-reviews-main"
        sx={{ paddingInline: "150px" }}
      >
        <Box className="all-reviews-reviews" sx={{ width: "60%" }}>
          <Typography variant="h4" className="mt-5">
            Reviews
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" className="mt-3">
              {filteredReviews.length} reviews
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap="10px"
              sx={{ margin: "0" }}
            >
              <Typography variant="p">Sort by</Typography>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                sx={{ mt: 1.5, minWidth: 120, borderRadius: "20px" }}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="best">Best</MenuItem>
                <MenuItem value="worst">Worst</MenuItem>
              </Select>
            </Box>
          </Box>
          <hr />
          <div className="all-reviews">
            {filteredReviews.length > 0 ? (
              filteredReviews
                .filter((review) => review.status === "active")
                .map((singleReview) => (
                  <div className="review mt-3" key={singleReview.id}>
                    <div className="user_info">
                      <div className="user_img">
                        {/* {singleReview.reviewer.user_info && singleReview.reviewer.user_info.profile_image ? (
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}${singleReview.reviewer.user_info.profile_image}`}
                            alt=""
                          />
                        ) : (
                          <DummyImage username={singleReview.reviewer.username} />
                        )} */}
                        {singleReview.reviewer.user_info &&
                        singleReview.reviewer.user_info.profile_image ? (
                          singleReview.reviewer.user_info?.signup_platform ==
                          "manual" ? (
                            <img
                              src={`${process.env.REACT_APP_IMG_URL}/${singleReview.reviewer.user_info.profile_image}`}
                              alt="Profile"
                            />
                          ) : (
                            <img
                              src={
                                singleReview.reviewer.user_info.profile_image
                              }
                              alt=""
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          )
                        ) : (
                          <DummyImage
                            username={singleReview.reviewer.username}
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
                      <StarRating rating={singleReview.rating} color="gold" />
                    </div>
                    <div className="review-text">
                      <p>{singleReview.review}</p>
                    </div>
                  </div>
                ))
            ) : (
              <Typography>No reviews found for selected filter</Typography>
            )}
          </div>
        </Box>
        <Box
          ref={filterRef}
          className="all-reviews-filter"
          sx={{
            width: {
              xs: "100%",
              md: "40%",
            },
            position: {
              xs: "static",
              md: "sticky",
            },
            top: {
              md: "50px",
            },
            right: 0,
          }}
        >
          <div className="rating_filter">
            <div className="rating_star">
              <StarRating rating="5" color="gold" size="large" />
            </div>
            <div className="avg_count">
              <Typography variant="h6">
                {averageRatingStore} • {storeDetails.reviews.length} reviews
              </Typography>
            </div>
            <div className="filter_by mt-3">
              <Typography variant="h6">
                Filter By
                <Box>
                  {ratingCounts.map(({ value, count }) => {
                    const percentage = totalReviews
                      ? (count / totalReviews) * 100
                      : 0;

                    return (
                      <Box
                        key={value}
                        display="flex"
                        alignItems="center"
                        mb={1}
                        gap={1}
                      >
                        <Checkbox
                          size="small"
                          checked={selectedRatings.includes(value)}
                          onChange={() => handleRatingFilterChange(value)}
                        />
                        <Typography sx={{ width: 12 }}>{value}</Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: "#eee",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#000",
                              },
                            }}
                          />
                        </Box>
                        <Typography sx={{ width: 30, textAlign: "right" }}>
                          {count}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Typography>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default AllReviewsPage;
