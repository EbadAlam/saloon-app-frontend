import { Box, Button, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { ROUTES } from "../../routes";
import StarRating from "../../components/StarRating/StarRating";
import Loader from "../../components/Loader/Loader";

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
                {stores.map((singleStore) => {
                  const averageRating = calculateAverageRating(
                    singleStore.reviews
                  );
                  return (
                    <Link
                      to={ROUTES.getStoreFrontPage(singleStore.slug)}
                      className="store"
                    >
                      <Box className="store_image">
                        {singleStore.thumbnail ? (
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}/${singleStore.thumbnail}`}
                            alt=""
                          />
                        ) : (
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/store-dummy-img.png`}
                            alt=""
                          />
                        )}
                        <Box className="hover_content">
                          <Button>Explore now</Button>
                        </Box>
                        <Box className="overlay"></Box>
                      </Box>
                      <Box className="store_content">
                        <Typography variant="h3">
                          {singleStore.title}
                        </Typography>
                        <StarRating rating={averageRating} color="#ffc800" />
                        <Typography variant="h4">{singleStore.type}</Typography>
                      </Box>
                    </Link>
                  );
                })}
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
