import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ROUTES } from '../../routes'
import Loader from '../../components/Loader/Loader';
import axiosClient from '../../axios-client';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

function BlogDetails() {
    const { slug } = useParams();
    const [loading,setLoading] = useState(true);
    const [blogDetails,setBlogDetails] = useState({});
    const [blogUrl, setBlogUrl] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const location = useLocation();
    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const {data} = await axiosClient.get(`/getBlogBySlug/${slug}`);
                setBlogDetails(data.blog);
            } catch (error) {
                console.error('Error fetching blog details :', error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogDetails();
    },[slug]);
  return (
    <Box className="blog_detail">
        {loading || !blogDetails ? <Loader /> : (
            <Box className="container">
                <Box className="blog_content">
                    <Typography variant='h1'>{blogDetails.title}</Typography>
                    <Typography variant='body1'>{blogDetails.short_description}</Typography>
                    <Box className="thumbnail">
                        <img src={`${process.env.REACT_APP_IMG_URL}/${blogDetails.thumbnail}`} alt={blogDetails.title} />
                    </Box>
                    <Box className="sections">
                        {JSON.parse(blogDetails.sections).map((singleSection,index) => (
                            <Box className="section" key={index}>
                                <Typography variant='h2'>{singleSection.heading}</Typography>
                                <Typography variant='body1'>{singleSection.content}</Typography>
                                {singleSection.image !== null && singleSection.image ? <img src={`${process.env.REACT_APP_IMG_URL}/${singleSection.image}`} alt={singleSection.heading} /> : ''}
                            </Box>
                        ))}
                    </Box>
                    <Box className="blog_footer">
                        <Typography variant='body1'>
                            Not signed up to BeautyTrafic yet? Check out what the 
                            {" "}<span style={{color:'#D8A7B1'}}>world's #1 online booking platform</span>{" "}
                            can do for your business.
                        </Typography>
                        <Typography variant='body1'>
                            Already signed up?
                            {" "}<Link to={ROUTES.loginSignup} style={{color:'#D8A7B1',textDecoration:'underline'}}>
                                Log in
                            </Link>{" "}
                            to manage your appointment calendar, payments, and marketing all from one place.
                        </Typography>
                        <Typography variant='body1'>
                            {JSON.parse(blogDetails.tags).map((singleTag,index) => (
                                <span key={index} style={{textTransform:'capitalize'}}>#{singleTag} </span>
                            ))}
                        </Typography>
                    </Box>
                </Box>
                <Box className="blog_share">
                    <a className="share_icon"
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        `${window.location.origin}${location.pathname}`
                    )}&title=${blogDetails.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <LinkedInIcon />
                    </a>
                    <a className="share_icon"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}${location.pathname}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <FacebookIcon />
                    </a>
                    <a className="share_icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        `${window.location.origin}${location.pathname}`
                        )}&text=${blogDetails.title}`}
                    >
                    <XIcon />
                    </a>
                </Box>
            </Box>
        )}
    </Box>
  )
}

export default BlogDetails