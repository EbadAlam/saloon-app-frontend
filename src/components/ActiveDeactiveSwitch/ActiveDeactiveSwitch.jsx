import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import axiosClient from '../../axios-client';

function ActiveDeactiveSwitch({ id, apiUrl,status, onStatusChange, label = 'Update', modal = ''  }) {

  const handleToggle = async () => {
    try {
      let newStatus = '';
      if(modal == 'blog'){
        newStatus = status === 'published' ? 'draft' : 'published';
      } else {
        newStatus = status === 'active' ? 'inactive' : 'active';
      }
        const { data } = await axiosClient.put(`${apiUrl}/${id}`, { status: newStatus });
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
          checked={modal == 'blog' ? status === 'published' : status === 'active'}
          name="loading"
          color="primary"
        />
      }
      label={label}
    />
  );
}

export default ActiveDeactiveSwitch;
