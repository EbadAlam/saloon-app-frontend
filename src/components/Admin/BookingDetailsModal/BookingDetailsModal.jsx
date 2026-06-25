import React from "react";
import {
  Modal, Box, Typography, IconButton, Divider, Grid,
  FormControl, Select, MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
  maxHeight: "93vh",
  overflowY: "auto",
};

const InfoBox = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="subtitle1" sx={{ fontWeight: 500, bgcolor: "#f9f9f9", p: 1.2, borderRadius: "6px" }}>
      {value ?? "-"}
    </Typography>
  </Box>
);

export default function BookingDetailsModal({
  open,
  onClose,
  booking,
  handleStatusChangeStatus,
}) {
  if (!booking) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} className='booking_detail_modal'>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="600">
            Booking Details {booking.worker?.username ? `— ${booking.worker?.username}` : ""}
          </Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {/* Service Info */}
        <Typography variant="subtitle2" fontWeight="600" gutterBottom>Service Information</Typography>
        <Grid container spacing={2} className='details_box'>
          <Grid item xs={12} md={6}>
            <InfoBox label="Service Name" value={booking.service?.title} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoBox label="Service Price" value={`${booking.service?.currency} ${booking.service?.price}`} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoBox label="Estimated Time" value={booking.service?.eta} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoBox label="Gender" value={booking.service?.gender ?? "-"} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Customer Info */}
        <Typography variant="subtitle2" fontWeight="600" gutterBottom>Customer Information</Typography>
        <Grid container spacing={2} className='details_box'>
          <Grid item xs={12} md={6}>
            <InfoBox label="User" value={booking.user?.username} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoBox label="Date" value={new Date(booking.booking_date).toLocaleDateString("en-GB")} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Worker Info (added) */}
        <Typography variant="subtitle2" fontWeight="600" gutterBottom>Worker Information</Typography>
        <Grid container spacing={2} className='details_box'>
          <Grid item xs={12} md={6}>
            <InfoBox label="Worker" value={booking.worker?.username} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoBox label="Role" value={booking.worker?.user_info?.designation} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoBox label="Email" value={booking.worker?.email} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Schedule */}
        <Typography variant="subtitle2" fontWeight="600" gutterBottom>Schedule</Typography>
        <Grid container spacing={2} className='details_box'>
          <Grid item xs={12} md={6}>
            <InfoBox
              label="Start Time"
              value={new Date(`1970-01-01T${booking.booking_time}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoBox
              label="End Time"
              value={new Date(`1970-01-01T${booking.booking_time_end}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Status */}
        <Typography variant="subtitle2" fontWeight="600" gutterBottom>Update Status</Typography>
        <FormControl fullWidth>
          <Select
            defaultValue={booking.status}
            onChange={(e) => handleStatusChangeStatus(booking.id, e.target.value)}
          >
            {["pending", "confirmed", "no show", "cancelled", "completed"].map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Modal>
  );
}
