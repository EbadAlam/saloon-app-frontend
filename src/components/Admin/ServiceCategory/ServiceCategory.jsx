import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AdminLayout from '../Layout/Layout';
import { ROUTES } from '../../../routes';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import BackButton from '../../BackButton/BackButton';
import { useSnackbar } from '../../../contexts/SnackBarContext';

function ServiceCategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [allCatLoading, setAllCatLoading] = useState(true);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [removeCategories, setRemoveCategories] = useState([]);
  const { storeId } = useParams();
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    fetchCategories();
    fetchAllCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getServicesCategory/${storeId}`);
      setServiceCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    setAllCatLoading(true);
    try {
      const { data } = await axiosClient.get('/getAllCategories');
      setAllCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch all categories:', error);
    } finally {
      setAllCatLoading(false);
    }
  };

  const availableCategories = allCategories.filter(
    (cat) => !serviceCategories.some((sc) => sc.category_id === cat.id)
  );

  const handleAddCheckboxChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleRemoveCheckboxChange = (categoryId) => {
    setRemoveCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSave = async () => {
    try {
      if (selectedCategories.length > 0) {
        await axiosClient.post(`/addCategoriesToStore/${storeId}`, {
          category_ids: selectedCategories
        });
      }

      if (removeCategories.length > 0) {
        await axiosClient.post(`/removeCategoriesFromStore/`, {
          ids: removeCategories
        });
      }

      await fetchCategories();
      setSelectedCategories([]);
      setRemoveCategories([]);
      showSnackbar("Changes save successfully!", "success");
    } catch (error) {
      console.error('Error saving changes:', error);
      showSnackbar("Failed to save changes.","error");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid dashboard-content">
        <Stack className='btn_headss' direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Service Categories</Typography>
          <Stack direction="row" gap={2} justifyContent='center'>
            <BackButton />
            {serviceCategories && serviceCategories.length > 0 && (
              <Link
                to={ROUTES.getAdminAddServices(storeId)}
                state={{ servicesCategories: serviceCategories }}
                rel="noopener noreferrer"
              >
                <Button variant="contained" sx={{background:'#333333'}}>Add Services</Button>
              </Link>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2} flexWrap='wrap' rowGap='10px'>
          <TableContainer className='store_cat' sx={{ position: 'relative' }} component={Paper}>
            {loading && <Loader />}
            <Table aria-label="Services Categories Table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Remove from store</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceCategories && serviceCategories.length > 0 ? (
                  serviceCategories.map((singleCat, index) => (
                    <TableRow key={singleCat.category_id}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell>{singleCat.category?.title}</TableCell>
                      <TableCell align="right">
                        <input
                          type="checkbox"
                          checked={removeCategories.includes(singleCat.id)}
                          onChange={() => handleRemoveCheckboxChange(singleCat.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No Categories
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer className='admin_cat' sx={{ position: 'relative' }} component={Paper}>
            {allCatLoading && <Loader />}
            <Table aria-label="All Categories Table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Add to store</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availableCategories && availableCategories.length > 0 ? (
                  availableCategories.filter((singleCat) => (singleCat.status == 'active')).map((singleCat, index) => (
                    <TableRow key={singleCat.id}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell>{singleCat.title}</TableCell>
                      <TableCell align="right">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(singleCat.id)}
                          onChange={() => handleAddCheckboxChange(singleCat.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No Categories
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>

        <Box p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={selectedCategories.length === 0 && removeCategories.length === 0}
          >
            Save Changes
          </Button>
        </Box>
      </div>
    </AdminLayout>
  );
}

export default ServiceCategoriesPage;
