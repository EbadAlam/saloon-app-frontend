import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar/UserSidebar'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import Loader from '../../components/Loader/Loader';
import axiosClient from '../../axios-client';
import { useAuth } from '../../contexts/AuthContext';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSnackbar } from '../../contexts/SnackBarContext';

function FavoritesPage() {
    const { user } = useAuth();
    const [loading,setLoading] = useState(true);
    const [favouriteStores,setFavouriteStore] = useState([]);
    const [loadingFavId, setLoadingFavId] = useState(null);

    const { showSnackbar } = useSnackbar();
    const [alertMessage,setAlertMessage] = useState('');

  useEffect(() => {
    const fetchUserFavStores = async () => {
        try {
            const { data } = await axiosClient.get(`/getUserFavStores/${user.id}`);
            const storesWithFlag = data.stores.map((s) => ({ ...s, isFav: true }));
            setFavouriteStore(storesWithFlag);
        } catch (error) {
            console.error('Error fetching user fav stores ',error);
        } finally {
            setLoading(false);
        }
    }
    fetchUserFavStores();
  },[user.id]);
    const handleAddToFav = async (store) => {
        setLoadingFavId(store.id);
        try {
            const payload = {
                store_id: store.id,
                user_id: user.id,
            };
            let data;
            if (store.isFav) {
                ({ data } = await axiosClient.post('removeFromFavourite', payload));
            } else {
                ({ data } = await axiosClient.post('addToFavourite', payload));
            }
            setAlertMessage(data.message);
            setTimeout(() => {
                setAlertMessage('');
            }, 2000);
            setFavouriteStore((prevStores) =>
                prevStores.map((s) =>
                    s.id === store.id ? { ...s, isFav: !s.isFav } : s
                )
            );
        } catch (error) {
            console.error('Failed to add or remove to favourites', error);
        } finally {
            setLoadingFavId(null);
        }
    }
    useEffect(() => {
        if (alertMessage) {
            showSnackbar(alertMessage, "success")
        }
    }, [alertMessage]);
  return (
    <Box className="profile">
        <Box className="container">
            <Box display='flex'>
                <UserSidebar />
                <Box className="content" sx={{padding:"20px 40px"}}>
                    {loading && <Loader />}
                    <Typography variant='h2'>Favorites</Typography>
                    <Box className="slider" sx={{position:'relative'}}>
                      {favouriteStores && favouriteStores.length > 0 ? (
                        favouriteStores.map((singleStore) => (
                                <Link className='linkTOStoresFav' to={ROUTES.getStoreFrontPage(singleStore.slug)}>
                                    <Box className="singleSlide">
                                        <Box className="lsideImg" display='flex' alignItems='center' justifyContent='center' sx={{overflow:'hidden', height:'330px',borderRadius:'10px 10px 0px 0px'}}>
                                            <img src={`${process.env.REACT_APP_IMG_URL}${singleStore.thumbnail}`} alt="" />
                                        </Box>
                                        <Box display='flex' flexDirection='column' gap="20px" className="slideInfo" sx={{background:'white',borderRadius:'0px 0px 10px 10px', padding:'15px 10px'}}>
                                            <Box className="titleRating" display='flex' alignItems='center' justifyContent='space-between'>
                                                <Box className="title">
                                                    <Typography variant='h4' sx={{fontSize:'18px',fontFamily:'Barlow',fontWeight:'600'}}>{singleStore.title}</Typography>
                                                </Box>
                                                <Box className="remove_fav">
                                                    {loadingFavId === singleStore.id ? <CircularProgress size="20px"/> : 
                                                        <div
                                                            className="save"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleAddToFav(singleStore);
                                                            }}
                                                            >
                                                            {singleStore.isFav ? (
                                                                <Tooltip title="Remove from favourites">
                                                                    <FavoriteIcon />
                                                                </Tooltip>
                                                            ) : (
                                                                <Tooltip title="Add to favourites">
                                                                <FavoriteBorderOutlinedIcon />
                                                                </Tooltip>
                                                            )}
                                                        </div>
                                                    }
                                                </Box>
                                            </Box>
                                            <Box className="address" display='flex' alignItems='center'>
                                                <RoomOutlinedIcon sx={{color:'#333333'}} />
                                                <Typography variant='body1' sx={{fontSize:'14px',fontFamily:'Barlow',color:'#333333',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>{singleStore.address}</Typography>
                                            </Box>
                                            <Box className="storeType" sx={{border:'1px solid #D7D7D7', borderRadius:'10px',width:'50%',margin:'0 auto',padding:'8px'}} textAlign='center'>
                                                <Typography variant='body1' sx={{fontSize:'18px',fontFamily:'Barlow',fontWeight:'600',color:'#333333'}}>{singleStore.type || 'Saloon'}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Link>
                            ))  
                          ) : (
                            <Typography variant='h6'>No favorites store yet</Typography>
                          )}
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default FavoritesPage