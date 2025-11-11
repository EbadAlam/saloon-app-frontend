import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Loader from '../../components/Loader/Loader';
import { Box, Typography } from '@mui/material';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { ROUTES } from '../../routes';
import StarIcon from '@mui/icons-material/Star';
import StoreCard from '../../components/StoreCard/StoreCard';


function SearchPage() {
  const [searchParams] = useSearchParams();
  const locationHook = useLocation();
  const [stores ,setStores] = useState([]);
  const [loading ,setLoading] = useState(true);
  const service = searchParams.get('service');
  const location = searchParams.get('location');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  useEffect(() => {
      document.body.className = "";
      if (locationHook.pathname === "/search") {
        document.body.classList.add("search-page");
      }
    }, [locationHook]);
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const payload = {
          service,
          location,
          startTime,
          endTime
        };
        const { data } = await axiosClient.post('/getSearchResults',payload);
        setStores(data.stores);
      } catch (err){
        console.error('Error fetching search results ',err);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchResults();
  }, [service,location,startTime,endTime])
  const calculateAverageRating = (reviews = []) => {
      const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
      return reviews.length > 0 ? (total / reviews.length).toFixed(1) : 'N/A';
  };
  return (
    <>
      {loading && <Loader />}
      <Box className='stores_section new_stores'>
        <Box className="container">
          <Box className="stores" justifyContent='start'>
                {stores && stores.length > 0 ? (
                  stores.map((singleStore) => {
                    const averageRating = calculateAverageRating(singleStore.reviews)
                    return (
                          // <Box className="store" key={singleStore.id}>
                          //   <Link to={ROUTES.getStoreFrontPage(singleStore.slug)}>
                          //       <Box className="singleSlide">
                          //           <Box className="lsideImg" display='flex' alignItems='center' justifyContent='center' sx={{overflow:'hidden', height:'330px',borderRadius:'10px 10px 0px 0px'}}>
                          //               <img src={`${process.env.REACT_APP_IMG_URL}${singleStore.thumbnail}`} alt="" />
                          //           </Box>
                          //           <Box display='flex' flexDirection='column' gap="20px" className="slideInfo" sx={{background:'white',borderRadius:'0px 0px 10px 10px', padding:'15px 10px'}}>
                          //               <Box className="titleRating" display='flex' alignItems='center' justifyContent='space-between'>
                          //                   <Box className="title">
                          //                       <Typography variant='h4' sx={{fontSize:'18px',fontFamily:'Barlow',fontWeight:'600'}}>{singleStore.title}</Typography>
                          //                   </Box>
                          //                   <Box className="rating" display='flex' alignItems='center' gap="3px">
                          //                       <Typography variant='h4' sx={{fontSize:'16px',fontFamily:'Barlow',fontWeight:'600'}}>{averageRating}</Typography>
                          //                       <StarIcon fontSize='small' sx={{color:'#333333'}} />
                          //                       <Typography variant='h4' sx={{fontSize:'14px',fontFamily:'Barlow'}}>({singleStore.reviews.length})</Typography>
                          //                   </Box>
                          //               </Box>
                          //               <Box className="address" display='flex' alignItems='center'>
                          //                   <RoomOutlinedIcon sx={{color:'#333333'}} />
                          //                   <Typography variant='body1' sx={{fontSize:'14px',fontFamily:'Barlow',color:'#333333',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>{singleStore.address}</Typography>
                          //               </Box>
                          //               <Box className="storeType" sx={{border:'1px solid #D7D7D7', borderRadius:'10px',width:'50%',margin:'0 auto',padding:'8px'}} textAlign='center'>
                          //                   <Typography variant='body1' sx={{fontSize:'18px',fontFamily:'Barlow',fontWeight:'600',color:'#333333'}}>{singleStore.type || 'Saloon'}</Typography>
                          //               </Box>
                          //           </Box>
                          //       </Box>
                          //   </Link>
                          // </Box>
                          <StoreCard key={singleStore.id} storeDetails={singleStore} />
                        )
                      })  
                    ) : (
                      <Typography variant='h6'>No results for your search</Typography>
                    )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SearchPage;
