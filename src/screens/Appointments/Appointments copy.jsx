import { Alert, Badge, Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar/UserSidebar'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../routes'
import axiosClient from '../../axios-client'
import { useAuth } from '../../contexts/AuthContext'
import Loader from '../../components/Loader/Loader'
import { useSnackbar } from '../../contexts/SnackBarContext'
import StarRating from '../../components/StarRating/StarRating'

function AppointmentsPage() {
  const location = useLocation();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [loading,setLoading] = useState(true);
  const [upBookings,setUpBookings] = useState([]);
  const [pastBookings,setPastBookings] = useState([]);
  const [store,setStore] = useState({});
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || "");
  useEffect(() => {
      if (successMessage) {
        showSnackbar(successMessage, "success")
      }
    }, [successMessage]);
  useEffect(() => {
    const fetchUserBookings = async () => {
        try {
            const { data } = await axiosClient.get(`/getUserBookings/${user.id}`);
            setUpBookings(data.upcomingBookings);
            setPastBookings(data.pastBookings);
            setStore(data.upcomingBookings.length > 0 ? data.upcomingBookings[0] : data.pastBookings.length > 0 ? data.pastBookings[0] : '')
        } catch (error) {
            console.error('Error fetching user fav stores ',error);
        } finally {
            setLoading(false);
        }
    }
    fetchUserBookings();
  },[user.id]);
  function formatBookingDate(date, time) {
    const dateTime = new Date(`${date}T${time}`);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",   
      day: "2-digit",     
      month: "short",    
      year: "numeric",    
      hour: "numeric",    
      minute: "2-digit",  
      hour12: true,       
    }).format(dateTime);
  }
  const calculateAverageRating = (reviews = []) => {
        const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
        return reviews.length > 0 ? (total / reviews.length).toFixed(1) : 'N/A';
    };
  return (
    <Box className="profile">
        <Box className="container">
            <Box display='flex'>
                <UserSidebar />
                <Box className="content">
                  {loading && <Loader />}
                    <Typography variant='h2'>Appointments</Typography>
                    <Box sx={{display:'flex',alignItems:'start',justifyContent:'space-between'}}>
                      <Box className="bookings">
                          <Box className="upcomming_bookings" sx={{marginTop:'40px'}}>
                            <Typography variant='h3' sx={{fontSize:'26px',fontFamily:'Barlow'}}>Upcomming
                              {upBookings && upBookings.length > 0 && <Badge sx={{marginLeft:'20px','& .MuiBadge-badge': { backgroundColor: '#333333', color: '#fff',}}} badgeContent={upBookings.length} color="success"></Badge>}
                            </Typography>
                            {upBookings && upBookings.length > 0 ? (
                              upBookings.map((singleBooking) => {
                                const avgRating = calculateAverageRating(singleBooking.store?.reviews);
                                return (
                                  <Box key={singleBooking.id} className={`bookingMain ${store.id == singleBooking.id ? 'active' : ''}`} onClick={() => {setStore(singleBooking)}}>
                                    <Box className="booking">
                                      <Box className="img">
                                        <img src={`${process.env.REACT_APP_IMG_URL}/${singleBooking.store?.thumbnail}`} alt="" />
                                      </Box>
                                      <div className="overlay"></div>
                                      <Box className="info">
                                        <Box className="store_title">
                                          <Link to={ROUTES.getStoreFrontPage(singleBooking.store?.slug)}>
                                            <Typography variant='h3' sx={{fontSize:'32px',fontFamily:'Barlow'}}>{singleBooking.store?.title}</Typography>
                                          </Link>
                                        </Box>
                                        <Box className="rating">
                                          <Typography variant='body1' sx={{fontSize:'14px',fontFamily:'Barlow',fontWeight:'600'}}>{avgRating}</Typography>
                                          <StarRating size='small' rating={avgRating} />
                                          <span style={{color:'#D8A7B1',fontSize:'16px'}}>({singleBooking.store?.reviews?.length})</span>
                                        </Box>
                                        <Box className="store_address">
                                          <Typography variant='body1' sx={{fontSize:'14px',fontFamily:'Barlow'}}>{singleBooking.store?.address}</Typography>
                                        </Box>
                                      </Box>
                                      <Box className="worker_info">
                                        <Box className="store_title">
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.worker?.username}</Typography>
                                          <Typography variant='body1' sx={{fontSize:'16px',fontFamily:'Barlow'}}>{singleBooking.worker?.user_info?.designation}</Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box className="booking_info">
                                      <Box className="service_info">
                                        <Box>
                                          <Box display='flex' gap='10px'>
                                            <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.service?.title}</Typography>
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                textTransform: "capitalize",
                                                color:
                                                  singleBooking.status === "pending"
                                                    ? "orange"
                                                    : singleBooking.status === "cancelled"
                                                    ? "red"
                                                    : singleBooking.status === "completed"
                                                    ? "green"
                                                    : "inherit",
                                              }}
                                            >
                                              {singleBooking.status}
                                            </Typography>

                                          </Box>
                                          <Typography variant='body1' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.service?.eta} with {singleBooking.worker?.username ? singleBooking.worker?.username : 'any professional'}</Typography>
                                        </Box>
                                        <Box>
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.service?.currency} {singleBooking.service?.price}</Typography>
                                        </Box>
                                      </Box>
                                      <Box className="time_info">
                                        <Box>
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>
                                            {new Date(`1970-01-01T${singleBooking.booking_time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                            {" - "} 
                                            {new Date(`1970-01-01T${singleBooking.booking_time_end}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.booking_date.split("-").reverse().join("/")}</Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                )
                              })
                            ) : (
                              <Box className="noBookings">
                                  <Typography variant='h3' sx={{fontSize:'22px',fontFamily:'Barlow'}}>No upcoming appointments</Typography>
                                  <Typography variant='body1' sx={{fontSize:'20px',fontFamily:'Barlow'}}>Your upcoming appointments will appear here when you book</Typography>
                                  <Link to={ROUTES.searchPage}>
                                    <Button className='search_btn' variant="contained">Search salons</Button>
                                  </Link>
                              </Box>
                            )}
                          </Box>
                          <Box className="past_bookings" sx={{marginTop:'20px'}}>
                            <Typography variant='h3' sx={{fontSize:'26px',fontFamily:'Barlow'}}>Past 
                              {pastBookings && pastBookings.length > 0 && <Badge sx={{marginLeft:'20px','& .MuiBadge-badge': { backgroundColor: '#333333', color: '#fff',}}} badgeContent={pastBookings.length} color="success"></Badge>}
                            </Typography>
                            {pastBookings && pastBookings.length > 0 ? (
                              pastBookings.map((singleBooking) => 
                              {
                                const avgRating = calculateAverageRating(singleBooking.store?.reviews);
                                return(
                                <Box className={`bookingMain ${store.id == singleBooking.id ? 'active' : ''}`} onClick={() => {setStore(singleBooking)}}>
                                    <Box className="booking">
                                      <Box className="img">
                                        <img src={`${process.env.REACT_APP_IMG_URL}/${singleBooking.store?.thumbnail}`} alt="" />
                                      </Box>
                                      <div className="overlay"></div>
                                      <Box className="info">
                                        <Box className="store_title">
                                          <Link to={ROUTES.getStoreFrontPage(singleBooking.store?.slug)}>
                                            <Typography variant='h3' sx={{fontSize:'32px',fontFamily:'Barlow'}}>{singleBooking.store?.title}</Typography>
                                          </Link>
                                        </Box>
                                        <Box className="rating">
                                          <Typography variant='body1' sx={{fontSize:'14px',fontFamily:'Barlow',fontWeight:'600'}}>{avgRating}</Typography>
                                          <StarRating size='small' rating={avgRating} />
                                          <span style={{color:'#D8A7B1',fontSize:'16px'}}>({singleBooking.store?.reviews?.length})</span>
                                        </Box>
                                        <Box className="store_address">
                                          <Typography variant='body1' sx={{fontSize:'14px',fontFamily:'Barlow'}}>{singleBooking.store?.address}</Typography>
                                        </Box>
                                      </Box>
                                      <Box className="worker_info">
                                        <Box className="store_title">
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.worker?.username}</Typography>
                                          <Typography variant='body1' sx={{fontSize:'16px',fontFamily:'Barlow'}}>{singleBooking.worker?.user_info?.designation}</Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box className="booking_info">
                                      <Box className="service_info">
                                        <Box>
                                          <Box display='flex' gap='10px'>
                                            <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.service?.title}</Typography>
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                textTransform: "capitalize",
                                                color:
                                                  singleBooking.status === "pending"
                                                    ? "orange"
                                                    : singleBooking.status === "cancelled"
                                                    ? "red"
                                                    : singleBooking.status === "completed"
                                                    ? "green"
                                                    : "inherit",
                                              }}
                                            >
                                              {singleBooking.status}
                                            </Typography>

                                          </Box>
                                          <Typography variant='body1' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.service?.eta} with {singleBooking.worker?.username ? singleBooking.worker?.username : 'any professional'}</Typography>
                                        </Box>
                                        <Box>
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{singleBooking.service?.currency} {singleBooking.service?.price}</Typography>
                                        </Box>
                                      </Box>
                                      <Box className="time_info">
                                        <Box>
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>
                                            {new Date(`1970-01-01T${singleBooking.booking_time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                            {" - "} 
                                            {new Date(`1970-01-01T${singleBooking.booking_time_end}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography variant='h3' sx={{fontSize:'18px',fontFamily:'Barlow'}}>{new Date(singleBooking.booking_date).toLocaleDateString("en-GB")}</Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                              )})
                            ) : (
                              <Box className="noBookings">
                                  <Typography variant='h3' sx={{fontSize:'22px',fontFamily:'Barlow'}}>No appointments</Typography>
                              </Box>
                            )}
                          </Box>
                      </Box>
                      {/* <Box className="booking_details">
                            <Box className="img">
                              <img src="http://127.0.0.1:8000/storage//thumbnails/DxA6SIKtV5BMZQzMLEwxL3sZajybQdGyGwNJtiU9.jpg" alt="" />
                              <Box className="title">
                                  <Typography variant='h3' sx={{fontSize:'30px',fontFamily:'Barlow'}}>No appointments</Typography>
                              </Box>
                            </Box>
                            <Box className="info">
                              <Box className="date_time">
                                  <Typography variant='h3' sx={{fontSize:'30px',fontFamily:'Barlow'}}>Mon, 18 Aug 2025 at 10:15 pm</Typography>
                              </Box>
                            </Box>
                      </Box> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default AppointmentsPage