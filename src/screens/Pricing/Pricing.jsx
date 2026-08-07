import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes';
import CheckIcon from '@mui/icons-material/Check';
import PricingSection from '../../components/PricingSection/PricingSection';

function Pricing() {
  return (
    <Box className="pricing_page">
        <PricingSection />
    </Box>
  )
}

export default Pricing