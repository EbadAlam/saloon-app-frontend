import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from '../../axios-client';

function DeleteButton({id, url,onStatusChange}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
        const { data } = await axiosClient.delete(`${url}/${id}`);
        if (onStatusChange) {
            onStatusChange(data);
        }
    } catch (err) {
      console.error('Failed to update status:', err);
      onStatusChange({
        message:'An error Occured! Try again later',
        success:false
      },false);
    }
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleOpen} color="error" aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;
