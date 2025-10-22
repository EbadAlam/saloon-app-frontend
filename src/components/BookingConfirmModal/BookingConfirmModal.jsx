import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: '90%',     
  maxWidth: 500,
  bgcolor: '#FFF8F0',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  textAlign:'center'
};

export default function BookingConfirmModal({ open, onClose }) {
  const navigate = useNavigate();
  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        navigate(ROUTES.userAppointment);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={style} className="booking_conf_modal">
          <img src={`${process.env.REACT_APP_BASE_URL}/logo-big.png`} alt="" />
          <Box display='flex' flexDirection='column' gap='10px'>
            <Typography variant="h2" sx={{fontSize :'24px',fontWeight:'600',fontFamily:'Barlow'}}>Thanks for Choosing Us!</Typography>
            <Typography variant="body1" sx={{fontSize :'18px',fontFamily:'Barlow'}}>Your Booking is confirmed.</Typography>
          </Box>
          <Link style={{width:'100%'}} to={ROUTES.userAppointment}>
            <Button variant='contained'>Done</Button>
          </Link>
        </Box>
    </Modal>
  );
}
