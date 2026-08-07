import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import StarRating from "../StarRating/StarRating";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import StarIcon from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "./StoreCard.scss";
function StoreCard({ storeDetails }) {
  const calculateAverageRating = (reviews = []) => {
    const total = reviews.reduce(
      (sum, r) => sum + parseFloat(r.rating || 0),
      0,
    );
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "0";
  };
  const averageRating = calculateAverageRating(storeDetails.reviews);
  // console.log('averageRating: ',storeDetails.title,averageRating);
  return (
    <div className="store-card">
      <Link
        style={{ display: "block" }}
        to={ROUTES.getStoreFrontPage(storeDetails.slug)}
      >
        <div className="store-img">
          <img
            src={`${process.env.REACT_APP_IMG_URL}${storeDetails.thumbnail}`}
            alt=""
          />
        </div>
      </Link>
      <div className="store-info">
        <Link
          style={{ display: "block" }}
          to={ROUTES.getStoreFrontPage(storeDetails.slug)}
        >
          <div className="store-title">
            <h3>{storeDetails.title}</h3>
          </div>
        </Link>
        <div className="store-address">
          <LocationOnOutlinedIcon />
          <p>{storeDetails.address}</p>
        </div>
        <div className="rating-reviews">
          <div className="rating">
            <StarIcon />
            <span>{averageRating}</span>
          </div>
          <div className="reviews">
            <p>
              (
              {storeDetails.reviews.length == 1
                ? `${storeDetails.reviews.length} Review`
                : `${storeDetails.reviews.length} Reviews`}
              )
            </p>
          </div>
        </div>
        <hr className="divider" />
        <div className="card-footer">
          <div className="start-from">
            <p>
              starting from <br />
              <span>PKR 50</span>
            </p>
          </div>
          <div className="book-now">
            <Link to={ROUTES.getBookingPage(storeDetails.slug)}>
              <button>Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
