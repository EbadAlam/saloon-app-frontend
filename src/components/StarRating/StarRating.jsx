import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ rating, size = 'medium', color = '#333333' }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const filled = i + 1 <= rating;
    const half = i + 0.5 <= rating && i + 1 > rating;

    if (filled) {
      stars.push(<StarIcon key={i} fontSize={size} style={{ color }} />);
    } else if (half) {
      stars.push(<StarHalfIcon key={i} fontSize={size} style={{ color }} />);
    } else {
      stars.push(<StarBorderIcon key={i} fontSize={size} style={{ color }} />);
    }
  }

  return <div style={{ display: 'flex', gap: 2 }}>{stars}</div>;
};

export default StarRating;
