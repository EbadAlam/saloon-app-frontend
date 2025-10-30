import React, { useEffect, useState } from 'react'
import AdminLayout from '../Layout/Layout'
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import { useAuth } from '../../../contexts/AuthContext';
import { LineChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes';

function Dashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [reviewsTrend,setReviewsTrend] = useState([]);
    const [todaysApp,setTodaysApp] = useState([]);
    const [upcommingApp,setUpcommingApp] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get(`/getDashboardDataVendor/${user.id}`);
            console.log('data ',data);
            setData(data.bookingsTrend);
            setTodaysApp(data.todaysBookings);
            setUpcommingApp(data.upcomingBookings);
            setReviewsTrend(data.reviewsTrend);
        } catch (error) {
            console.error('Error fetching data ',error);
        } finally {
            setLoading(false);
        }
      }
      fetchData();
    }, [])
    const uniqueDates = [...new Set(data.map(item => item.date))];
    const uniqueStores = [...new Set(data.map(item => item.store_name))];

    const series = uniqueStores.map(store => ({
        label: store,
        data: uniqueDates.map(date => {
            const entry = data.find(d => d.date === date && d.store_name === store);
            return entry ? entry.count : 0;
        })
    }));
    const uniqueDatesReviews = [...new Set(reviewsTrend.map(item => item.date))];
    const uniqueStoresReviews = [...new Set(reviewsTrend.map(item => item.store_name))];

    const seriesReviews = uniqueStoresReviews.map(store => ({
        label: store,
        data: uniqueDatesReviews.map(date => {
            const entry = reviewsTrend.find(d => d.date === date && d.store_name === store);
            return entry ? entry.count : 0;
        })
    }));
    return (
        <AdminLayout>
            {loading && <Loader />}
            <div className='container-fluid dashboard-content'></div>
            <Box className="charts_main">
              <Box className="reviews_chart upcomming_app">
                <Box className="charts">
                  <Box className="card_header">
                    <Typography variant='h3' sx={{margin:'10px',fontSize:'30px'}}>Upcoming appointments (Next 7 days)</Typography>
                  </Box>
                  <Box className="lists">
                    {upcommingApp?.length > 0 ? 
                      upcommingApp.map((singleApp) => (
                        <Link to={ROUTES.getAdminBookings(singleApp.store.id)}>
                          <Box className="list-item">
                            <Box className="date">
                              <Typography variant='body1' className='date_day'>{new Date(`${singleApp.booking_date}T${singleApp.booking_time}`).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</Typography>
                              <Typography variant='body1' className='date_time'>{new Date(`${singleApp.booking_date}T${singleApp.booking_time}`).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Typography>
                            </Box>
                            <Box className="booking_det">
                              <Typography variant='body1' className='service_name'>{singleApp.service?.title}</Typography>
                              <Typography variant='body1' className='eta_worker'>{singleApp.user?.username}, {singleApp.service?.eta} {singleApp.worker ? `with ${singleApp.worker.username}` : ''}</Typography>
                            </Box>
                          </Box>
                        </Link>
                      ))
                     : (
                      <Box className="noList">
                        <Box className="icon">
                          <SignalCellularAltIcon />
                        </Box>
                        <Typography variant='h4'>Your schedule is empty</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box className="reviews_chart upcomming_app_today">
                <Box className="charts">
                  <Box className="card_header">
                    <Typography variant='h3' sx={{margin:'10px',fontSize:'30px'}}>Today's next appointments</Typography>
                  </Box>
                  <Box className="lists">
                    {todaysApp?.length > 0 ? 
                      todaysApp.map((singleApp) => (
                        <Box className="list-item">
                          <Box className="date">
                            <Typography variant='body1' className='date_day'>{new Date(`${singleApp.booking_date}T${singleApp.booking_time}`).toLocaleString('en-US', { weekday: 'short' })}</Typography>
                            <Typography variant='body1' className='date_time'>{new Date(`${singleApp.booking_date}T${singleApp.booking_time}`).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Typography>
                          </Box>
                          <Box className="booking_det">
                            <Typography variant='body1' className='service_name'>{singleApp.service?.title}</Typography>
                            <Typography variant='body1' className='eta_worker'>{singleApp.user?.username}, {singleApp.service?.eta} {singleApp.worker ? `with ${singleApp.worker.username}` : ''}</Typography>
                          </Box>
                        </Box>
                      ))
                     : (
                      <Box className="noList">
                        <Box className="icon">
                          <EventBusyIcon />
                        </Box>
                        <Typography variant='h4'>No Appointments Today</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box className="bookings_chart">
                <Box className="charts">
                  <Box className="card_header">
                    <Typography variant='h3' sx={{margin:'10px',fontSize:'30px'}}>Booking Trends</Typography>
                  </Box>
                  {/* <LineChart
                    width={800}
                    height={400}
                    xAxis={[{ scaleType: 'point', data: uniqueDates }]}
                    series={series}
                    yAxis={[
                      {
                        min: 0,
                        max: Math.max(
                          20,
                          Math.ceil(Math.max(...series.flatMap(s => s.data)))
                        ),
                        tickMinStep: 1,
                        valueFormatter: (value) => Math.round(value),
                      }
                    ]}
                    sx={{
                      [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
                        strokeWidth: 1,
                      },
                      [`.${lineElementClasses.root}[data-series="pvId"]`]: {
                        strokeDasharray: '5 5',
                      },
                      [`.${lineElementClasses.root}[data-series="uvId"]`]: {
                        strokeDasharray: '3 4 5 2',
                      },
                      [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
                        fill: '#g',
                      },
                      [`& .${markElementClasses.highlighted}`]: {
                        stroke: 'none',
                      },
                    }}
                  /> */}
                <LineChart
                  height={450}
                  xAxis={[
                    {
                      scaleType: 'point',
                      data: uniqueDates,
                      label: "Date",
                    }
                  ]}
                  yAxis={[
                    {
                      min: 0,
                      max: Math.max(
                        10,
                        Math.ceil(Math.max(...series.flatMap(s => s.data)))
                      ),
                      tickMinStep: 1,
                      valueFormatter: (value) => Math.round(value),
                    }
                  ]}
                  series={series.map((s, i) => ({
                    ...s,
                    curve: "monotoneX",
                    showMark: false,
                    lineWidth: 3,
                    area: false,
                  }))}
                  grid={{ horizontal: true, vertical: true }}
                  sx={{
                    borderRadius: "12px",
                    padding: "16px",
                    "& .MuiChartsAxis-root": {
                      fontSize: "0.85rem",
                      fill: "#374151",
                    },
                    "& .MuiChartsLegend-root": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
                </Box>
              </Box>
              <Box className="reviews_chart">
                <Box className="charts">
                  <Box className="card_header">
                    <Typography variant='h3' sx={{margin:'10px',fontSize:'30px'}}>Reviews Trends</Typography>
                  </Box>
                  <LineChart
                  height={450}
                  xAxis={[
                    {
                      scaleType: 'point',
                      data: uniqueDatesReviews,
                      label: "Date",
                    }
                  ]}
                  yAxis={[
                    {
                      min: 0,
                      max: Math.max(
                          10,
                        Math.ceil(Math.max(...seriesReviews.flatMap(s => s.data)))
                      ),
                      tickMinStep: 1,
                      valueFormatter: (value) => Math.round(value),
                    }
                  ]}
                  series={seriesReviews.map((s, i) => ({
                    ...s,
                    curve: "linear",
                    showMark: false,
                    lineWidth: 1,
                    area: false,
                  }))}
                  grid={{ horizontal: true, vertical: true }}
                  sx={{
                    borderRadius: "12px",
                    padding: "16px",
                    "& .MuiChartsAxis-root": {
                      fontSize: "0.85rem",
                      fill: "#374151",
                    },
                    "& .MuiChartsLegend-root": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
                </Box>
              </Box>
            </Box>
            
        </AdminLayout>
    )
}

export default Dashboard