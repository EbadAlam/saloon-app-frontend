import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import axiosClient from '../../axios-client';

function ActiveDeactiveSwitchMaster({ id, apiUrl,status, onStatusChange, label = 'Update',model  }) {

  const handleToggle = async () => {
    try {
      const payload = {
        model,
      }
        const { data } = await axiosClient.put(`${apiUrl}/${id}`,payload);
        if (onStatusChange) {
            onStatusChange(data);
        }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <FormControlLabel
      sx={{ display: 'block' }}
      control={
        <Switch
          onChange={handleToggle}
          checked={status == 1}
          name="loading"
          color="primary"
        />
      }
      label={label}
    />
  );
}

export default ActiveDeactiveSwitchMaster;
