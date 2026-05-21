import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";
import { useSnackbar } from "../../contexts/SnackBarContext";

const AddReviewForm = ({ onSubmit, storeId, userId, storeUsers = [] }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [targetUserId, setTargetUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "error");
    }
  }, [alertMessage]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage("");
    if (!rating) return setAlertMessage("Please provide a rating.");

    setLoading(true);

    const payload = {
      store_id: storeId,
      reviewer_id: userId,
      rating,
      review,
      title,
      reviewee_id: targetUserId || null,
    };

    try {
      await onSubmit(payload);
      setRating(0);
      setReview("");
      setTargetUserId("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={`reviewFormDiv ${showForm ? 'show' : ''}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: 2,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h6"
        onClick={() => setShowForm(!showForm)}
        sx={{ cursor: "pointer" }}
      >
        Write a Review
      </Typography>
        <div className="addReviewForm">
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            precision={0.5}
          />

          <TextField
            label="Tagline"
            rows={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Your review"
            multiline
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          {storeUsers.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="target-user-label">
                Select store user (optional)
              </InputLabel>
              <Select
                labelId="target-user-label"
                value={targetUserId}
                label="Select store user (optional)"
                onChange={(e) => setTargetUserId(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {storeUsers.map((user) => (
                  <MenuItem key={user.user?.id} value={user.user?.id}>
                    {user.user?.username ||
                      user.user?.name ||
                      `User #${user.user?.id}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ background: "#333333" }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
    </Box>
  );
};

export default AddReviewForm;
