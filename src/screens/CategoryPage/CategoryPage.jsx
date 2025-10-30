import { Box, Button, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { ROUTES } from "../../routes";
import StarRating from "../../components/StarRating/StarRating";
import Loader from "../../components/Loader/Loader";
import StoreCard from "../../components/StoreCard/StoreCard";

function CategoryPage() {
  const { slug } = useParams();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("All Categories");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  useEffect(() => {
    fetchStores();
  }, [slug]);
  const fetchStores = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `getStoresByCategory/${slug}?page=${page}`
      );
      setStores(data.stores.data);
      setCategoryName(data.category_name);
      setPagination({
        current_page: data.stores.current_page,
        last_page: data.stores.last_page,
        total: data.stores.total,
      });
    } catch (error) {
      console.error("Error fetching stores by category");
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchStores(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const calculateAverageRating = (reviews = []) => {
    const total = reviews.reduce(
      (sum, r) => sum + parseFloat(r.rating || 0),
      0
    );
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  };
  return (
    <Box className="category_page">
      {loading && <Loader />}
      {stores.length > 0 ? (
        <>
          <Box className="stores_section trending_stores">
            <Box className="container">
              <Typography
                variant="h3"
                sx={{
                  fontSize: "32px",
                  fontFamily: "Barlow",
                  fontWeight: "600",
                  color: "#333333",
                  textAlign: "center",
                }}
              >
                {categoryName}
              </Typography>
              <hr />
              <Box className="stores">
                {stores.map((singleStore) => (
                    <StoreCard storeDetails={singleStore} />
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="pagination_box">
            <Pagination
              count={pagination.last_page}
              page={pagination.current_page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        </>
      ) : (
        <Box className="no_data">
        <Typography variant="h4">No data found</Typography>
        </Box>
      )}
    </Box>
  );
}

export default CategoryPage;
