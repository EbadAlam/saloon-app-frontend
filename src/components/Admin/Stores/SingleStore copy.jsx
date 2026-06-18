import { Box, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminLayout from '../Layout/Layout';
import axiosClient from '../../../axios-client';
import Cards from '../Cards/Cards';
import BackButton from '../../BackButton/BackButton';

function SingleStore() {
    const { storeId } = useParams();
    const [storeData,setStoreData] = useState({});
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const fetchStoreDetails = async () => {
            try {
                const { data } = await axiosClient.get(`/getStoreDetails/${storeId}`);
                setStoreData(data.storeDetails);
                setLoading(false);
            } catch (error) {
                console.error('error fetching store details: ',error);
            }
        }
        fetchStoreDetails();
    },[storeId])
  return (
    <AdminLayout>
        <div className="container-fluid dashboard-content">
            <Box display='flex' justifyContent='end'>
                <BackButton />
            </Box>
            <Box className='vendorSingleStorePage mt-4'>
                {
                    loading ? (
                        <Skeleton variant="rectangular" width="50%" height={400} />
                    ) : (
                        <Cards storeData={storeData} />
                    )
                }
            </Box>
        </div>
    </AdminLayout>
  )
}

export default SingleStore