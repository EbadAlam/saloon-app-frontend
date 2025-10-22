import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from "../../routes";
import Pagination from '@mui/material/Pagination';
import WordLimitedText from '../../components/WordLimitedText/WordLimitedText';
import Loader from '../../components/Loader/Loader';
import axiosClient from '../../axios-client';

function Blogs() {
  const tags = ['All Topics','Meet the Partners','BeautyTraffic Features','BeautyTraffic News','Business Tips'];
  const [selectedTag,setSelectedTag] = useState('All Topics');
  const [loading,setLoading] = useState(true);
  const [blogs,setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const handlePageChange = (e, page) => {
    fetchBlogs(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fetchBlogs = async (page = 1) => {
    try { 
      const { data } = await axiosClient.get(`/getBlogs?page=${page}`);
      setBlogs(data.blogs.data);
      setPagination({
        current_page: data.blogs.current_page,
        last_page: data.blogs.last_page,
        total: data.blogs.total,
      });
    } catch (error) {
      console.error('error fetching blogs', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBlogs();
  }, [])
  const filteredBlogs = blogs.filter(blog => {
    if (blog.status !== 'published') return false;

    if (selectedTag === 'All Topics') return true;

    let blogTags = [];
    try {
      blogTags = typeof blog.tags === "string" ? JSON.parse(blog.tags) : blog.tags || [];
    } catch (e) {
      console.error("Invalid tags format:", blog.tags);
    }

    return blogTags.some(tag => tag.trim().toLowerCase() === selectedTag.toLowerCase());
  });
  return (
    <Box className="blogs_main">
      <Box className="container p-t-100">
        <Typography variant='h1' sx={{fontWeight:'500'}} textAlign='center'>Latest news on Beauty Traffic</Typography>
        <Box className="categories m-t-20">
          {tags.map((singleTag) => (
            <Box className={`category ${selectedTag == singleTag ? 'active' : ''}`} onClick={() => setSelectedTag(singleTag)}>
              <Typography variant='h4' sx={{fontSize:'16px'}} textAlign='center'>{singleTag}</Typography>
            </Box>
          ))}
        </Box>
        {loading ? <Loader /> : (
          <Box className={`blogs m-t-20 flexStart`}>
            {filteredBlogs && filteredBlogs.length > 0 ? (
              filteredBlogs.filter(blog => blog.status == 'published').map((singleBlog) => (
                <Link className="blog" to={ROUTES.getBlogPage(singleBlog.slug)}>
                  <Box>
                    <Box className="blog_img">
                      <img src={`${process.env.REACT_APP_IMG_URL}/${singleBlog.thumbnail}`} alt="" />
                    </Box>
                    <Box className="blog_content">
                      <Typography variant='h5'>{singleBlog.category}</Typography>
                      <Typography variant='h3'>{singleBlog.title}</Typography>
                      <WordLimitedText
                        text={singleBlog.short_description}
                        wordLimit={30}
                      />
                      <Typography variant='h4'>
                        By BeautyTraffic on {" "}
                        {new Date(singleBlog.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              ))
            ) : (
              <Typography variant='h4'>No Blogs</Typography>
            )}
            
          </Box>
        )}
        <Box className='blogs_pagination'>
          <Pagination
            count={pagination.last_page}
            page={pagination.current_page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Blogs