import React, { useState } from 'react';
import { Box, Button, Modal, useMediaQuery, useTheme } from '@mui/material';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

const CustomGallery = ({ images = [], thumbnail = null,slug }) => {
  const allImages = thumbnail ? [{ image: thumbnail }, ...images] : images;
  const count = allImages.length;
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (isMobile) {
    return (
      <Box>
       <Slider
          {...sliderSettings}
          infinite={allImages.length > 1}
          arrows={allImages.length > 1}
          dots={allImages.length > 1}
        >
          {allImages.map((imgObj, idx) => (
            <Box key={idx}>
              <img
                src={`${process.env.REACT_APP_IMG_URL}${imgObj.image}`}
                alt={`Slide ${idx}`}
                style={{ width: '100%', height: 300, objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    );
  }

  const visibleImages = count > 3 ? allImages.slice(0, 3) : allImages;

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          ...(visibleImages.length === 3 && {
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(2, 1fr)',
          }),
        }}
      >
        {visibleImages.length === 3 && (
          <>
          <Link to={ROUTES.getStoreGalleryPage(slug)} state={{gallery:allImages}}>
            <Box
              sx={{
                gridRow: '1 / span 2',
                gridColumn: '1 / 2',
                overflow: 'hidden',
                borderRadius: 2,
                position: 'relative',
              }}
              className="gallery_img"
            >
              <img
                src={`${process.env.REACT_APP_IMG_URL}${visibleImages[0].image}`}
                alt="Gallery 1"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
              </Link>
            {[1, 2].map((i) => (
              <Link to={ROUTES.getStoreGalleryPage(slug)} state={{gallery:allImages}} key={i}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                }}
                className="gallery_img"
              >
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${visibleImages[i].image}`}
                  alt={`Gallery ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {i === 2 && count > 3 && (
                  <Box className="view-all-btn">
                    <Link to={ROUTES.getStoreGalleryPage(slug)} state={{gallery:allImages}}>
                      <Button variant="contained" size="small">
                        See all images
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box>
              </Link>
            ))}
          </>
        )}

        {visibleImages.length === 2 && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {visibleImages.map((src, idx) => (
              <Link to={ROUTES.getStoreGalleryPage(slug)} state={{gallery:allImages}} key={idx}>
                <Box sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', position: 'relative' }} className="gallery_img">
                  <img
                    src={`${process.env.REACT_APP_IMG_URL}${src.image}`}
                    alt={`Gallery ${idx}`}
                    style={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                </Box>
              </Link>
            ))}
          </Box>
        )}

        {visibleImages.length === 1 && (
          <Link to={ROUTES.getStoreGalleryPage(slug)} state={{gallery:allImages}}>
          <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }} className="gallery_img">
            <img
              src={`${process.env.REACT_APP_IMG_URL}${visibleImages[0].image}`}
              alt="Gallery single"
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
            />
          </Box>
          </Link>
        )}
      </Box>

      <Modal open={viewAllOpen} onClose={() => setViewAllOpen(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            m: 'auto',
            mt: 10,
            maxWidth: '80%',
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 2,
            }}
          >
            {allImages.map((src, idx) => (
              <Box key={idx} sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${src.image}`}
                  alt={`Gallery ${idx}`}
                  style={{ width: '100%', height: 150, objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomGallery;
