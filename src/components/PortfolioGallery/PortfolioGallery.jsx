import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

const PortfolioGallery = ({ portfolioImages = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sortedImages, setSortedImages] = useState([]);

  useEffect(() => {
    if (portfolioImages.length > 0) {
      const sorted = [...portfolioImages].sort((a, b) => a.order - b.order);
      setSortedImages(sorted);
    }
  }, [portfolioImages]);

  const images = sortedImages.length > 0 ? sortedImages : [];

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <style>{`
        .portfolio-section {
          margin-top: 60px;
          margin-bottom: 40px;
        }

        .portfolio-title {
          font-size: 30px;
          font-weight: 400;
          color: #1a1a2e;
          margin-bottom: 24px;
          font-family: inherit;
        }

        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .masonry-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          background: #f0efe8;
          aspect-ratio: 1;
        }

        .masonry-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
        .masonry-item:nth-child(6) { grid-column: span 1; }
        .masonry-item:nth-child(9) { grid-column: span 1; grid-row: span 1; }

        .masonry-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease, filter 0.3s ease;
          display: block;
        }

        .masonry-item:hover img {
          transform: scale(1.08);
          filter: brightness(0.9);
        }

        .masonry-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          font-size: 28px;
          color: #fff;
        }

        .masonry-item:hover .masonry-overlay {
          opacity: 1;
          background: rgba(0, 0, 0, 0.4);
        }

        /* Lightbox Styles */
        .lightbox-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: zoomIn 0.3s ease;
        }

        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-counter {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .lightbox-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          font-size: 24px;
          z-index: 10000;
        }

        .lightbox-button:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #fff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          font-size: 24px;
          padding: 0;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .lightbox-info {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: #fff;
          font-size: 13px;
          background: rgba(0, 0, 0, 0.3);
          padding: 10px 14px;
          border-radius: 6px;
          backdrop-filter: blur(10px);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .portfolio-title {
            font-size: 24px;
            margin-bottom: 16px;
          }

          .masonry-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 8px;
          }

          .masonry-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }

          .lightbox-backdrop {
            padding: 0;
          }

          .lightbox-image {
            max-height: 80vh;
            border-radius: 0;
          }

          .lightbox-button {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .lightbox-prev {
            left: 10px;
          }

          .lightbox-next {
            right: 10px;
          }

          .lightbox-counter {
            top: 10px;
            right: 10px;
            font-size: 12px;
            padding: 6px 10px;
          }

          .lightbox-close {
            top: 10px;
            left: 10px;
            width: 36px;
            height: 36px;
            font-size: 20px;
          }

          .lightbox-info {
            font-size: 12px;
            padding: 8px 12px;
            left: 10px;
            bottom: 10px;
          }
        }

        @media (max-width: 480px) {
          .masonry-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }

          .portfolio-title {
            font-size: 20px;
            margin-bottom: 12px;
          }
        }
      `}</style>

      <div className="portfolio-section">
        <h4 className="heading">Portfolio</h4>
        
        <div className="masonry-grid">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className="masonry-item"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={`${process.env.REACT_APP_IMG_URL}${image.image_path}`} 
                alt="Portfolio"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200?text=Error';
                }}
              />
              <div className="masonry-overlay">
                <ZoomOutMapIcon />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>

            <div className="lightbox-counter">
              {selectedImageIndex + 1} / {images.length}
            </div>

            <button 
              className="lightbox-button lightbox-prev" 
              onClick={goToPrevious}
              title="Previous (←)"
            >
              <ChevronLeftIcon />
            </button>

            <img 
              src={`${process.env.REACT_APP_IMG_URL}${images[selectedImageIndex].image_path}`}
              alt="Portfolio"
              className="lightbox-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800?text=Error';
              }}
            />

            <button 
              className="lightbox-button lightbox-next" 
              onClick={goToNext}
              title="Next (→)"
            >
              <ChevronRightIcon />
            </button>

            <div className="lightbox-info">
              Use arrow keys or buttons to navigate • ESC to close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioGallery;