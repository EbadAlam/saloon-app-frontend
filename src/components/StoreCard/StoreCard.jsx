import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import StarRating from "../StarRating/StarRating";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import StarIcon from '@mui/icons-material/Star';
function StoreCard({ storeDetails }) {
  const calculateAverageRating = (reviews = []) => {
    const total = reviews.reduce(
      (sum, r) => sum + parseFloat(r.rating || 0),
      0
    );
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "";
  };
  const rating = calculateAverageRating(storeDetails.reviews);
  return (
    <Link
      to={ROUTES.getStoreFrontPage(storeDetails.slug)}
      className="store"
      key={storeDetails.id}
    >
      <Box className="store_image">
        {storeDetails.thumbnail ? (
          <img
            src={`${process.env.REACT_APP_IMG_URL}/${storeDetails.thumbnail}`}
            alt=""
          />
        ) : (
          <img
            src={`${process.env.REACT_APP_BASE_URL}/store-dummy-img.png`}
            alt=""
          />
        )}
        {/* <Box className="hover_content">
          <Button>Explore now</Button>
        </Box>
        <Box className="overlay"></Box> */}
      </Box>
      <Box className="store_content">
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="h3">{storeDetails.title}</Typography>
          {/* <StarRating
            rating={calculateAverageRating(storeDetails.reviews)}
            color="#ffc800"
          /> */}
          {rating ? (
            <Box display='flex' gap="5px" alignItems="center">
              <StarIcon style={{ color:'#ffc800' }} />
              <Typography variant="body1" style={{fontWeight:'700'}}>{rating}</Typography>
              <Typography variant="body1" style={{color:'grey'}}>({storeDetails.reviews.length})</Typography>
            </Box>
          ) : ''}
        </Box>
        {/* <Typography variant="body1" sx={{ display: '-webkit-box', WebkitLineClamp: 1,WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', }}>{storeDetails.about}</Typography> */}
        <Box display="flex" sx={{ marginTop: "5px" }}>
          {/* <LocationPinIcon /> */}
          <Typography
            variant="body1"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: "2px !important",
            }}
          >
            {storeDetails.address}
          </Typography>
        </Box>
        <Typography variant="h4">{storeDetails.type}</Typography>
      </Box>
    </Link>
  );
}

export default StoreCard;
