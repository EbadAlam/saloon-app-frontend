import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layout/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosClient from '../../../axios-client';
import Loader from '../../Loader/Loader';
import { useSnackbar } from '../../../contexts/SnackBarContext';

const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  backBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", border: "1px solid #1a1a2e", borderRadius: "8px", background: "#fff", color: "#1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  crumb: { fontSize: "14px", color: "#888", textDecoration: "none" },
  crumbActive: { fontSize: "14px", color: "#1a1a2e", fontWeight: 500 },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" },
  pageTitle: { fontSize: "20px", fontWeight: 600, color: "#1a1a2e" },
  card: { background: "#fff", borderRadius: "14px", border: "0.5px solid #e0dfd8", padding: "24px", overflow: "hidden" },
  uploadBox: { border: "2px dashed #e0dfd8", borderRadius: "12px", padding: "40px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "#fafaf8" },
  uploadBoxHover: { borderColor: "#1a1a2e", background: "#f5f4f0" },
  uploadIcon: { fontSize: "40px", color: "#888", marginBottom: "12px" },
  uploadText: { fontSize: "14px", color: "#555", marginBottom: "4px" },
  uploadSubtext: { fontSize: "12px", color: "#aaa" },
  gallery: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px", marginTop: "20px" },
  galleryItem: { position: "relative", borderRadius: "12px", overflow: "hidden", background: "#f5f4f0", aspectRatio: "1/1", cursor: "grab" },
  galleryImg: { width: "100%", height: "100%", objectFit: "cover" },
  deleteBtn: { position: "absolute", top: "8px", right: "8px", background: "#fcebeb", border: "none", color: "#791f1f", borderRadius: "6px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" },
  galleryItemHover: { opacity: 1 },
  emptyState: { padding: "60px 20px", textAlign: "center", color: "#aaa" },
  emptyTitle: { fontSize: "16px", fontWeight: 600, color: "#1a1a2e", marginBottom: "8px" },
  emptyText: { fontSize: "13px", color: "#888" },
  dragOverlay: { position: "absolute", inset: "0", background: "rgba(26, 26, 46, 0.8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: 500, borderRadius: "12px" },
  dragHint: { fontSize: "12px", color: "#aaa", marginTop: "12px", textAlign: "center" },
  fileInput: { display: "none" },
};

function AdminPortfolioPage() {
  const { storeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = React.useRef(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchPortfolio();
  }, [storeId]);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getStorePortfolio/${storeId}`);
      setPortfolio(data.portfolio || []);
      setStoreName(data.storeName || "");
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      showSnackbar('Failed to load portfolio', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files) => {
    if (!files.length) return;

    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        showSnackbar('Only images are allowed', 'error');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('Image size must be less than 5MB', 'error');
        return false;
      }
      return true;
    });

    for (const file of validFiles) {
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const fileId = Math.random().toString(36);
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

    const formData = new FormData();
    formData.append('image', file);
    formData.append('store_id', storeId);

    try {
      const { data } = await axiosClient.post('/uploadPortfolioImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        }
      });

      setPortfolio(prev => [...prev, data.image]);
      showSnackbar('Image uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      showSnackbar('Failed to upload image', 'error');
    } finally {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    }
  };

  const handleDelete = async (imageId) => {
    if (window.confirm('Delete this image?')) {
      setLoading(true);
      try {
        await axiosClient.post('/deletePortfolioImage', { 
          image_id: imageId, 
          store_id: storeId 
        });
        setPortfolio(prev => prev.filter(img => img.id !== imageId));
        showSnackbar('Image deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting image:', error);
        showSnackbar('Failed to delete image', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDropFiles = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleUpload(files);
  };

  const handleDropReorder = async (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newPortfolio = [...portfolio];
    const draggedItem = newPortfolio[draggedIndex];
    newPortfolio.splice(draggedIndex, 1);
    newPortfolio.splice(dropIndex, 0, draggedItem);

    setPortfolio(newPortfolio);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Save order to backend
    try {
      await axiosClient.post('/updatePortfolioOrder', {
        store_id: storeId,
        order: newPortfolio.map((img, idx) => ({ id: img.id, order: idx }))
      });
    } catch (error) {
      console.error('Error updating order:', error);
      showSnackbar('Failed to update image order', 'error');
    }
  };

  return (
    <AdminLayout>
      <div style={S.page}>
        {loading && <Loader />}

        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <button style={S.backBtn} onClick={() => window.history.back()}>
            <ArrowBackIcon style={{ fontSize: 13 }} /> Back
          </button>
          <div style={{ marginTop: "16px" }}>
            <span style={S.crumb}>Stores</span>
            <span style={{ color: "#bbb" }}> › </span>
            <span style={S.cromb}>{storeName}</span>
            <span style={{ color: "#bbb" }}> › </span>
            <span style={S.crumbActive}>Portfolio</span>
          </div>
        </div>

        <div style={S.header}>
          <h1 style={S.pageTitle}>Portfolio Management</h1>
          <button 
            style={{ ...S.backBtn, border: "none", background: "#1a1a2e", color: "#fff" }}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon style={{ fontSize: 14 }} /> Upload Images
          </button>
        </div>

        <div style={S.card}>
          {/* Upload Area */}
          <div
            style={S.uploadBox}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "#1a1a2e";
              e.currentTarget.style.background = "#f5f4f0";
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = "#e0dfd8";
              e.currentTarget.style.background = "#fafaf8";
            }}
            onDrop={handleDropFiles}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={S.uploadIcon}>📤</div>
            <p style={S.uploadText}>Drag and drop images here or click to upload</p>
            <p style={S.uploadSubtext}>Supports JPG, PNG, WebP up to 5MB each</p>
          </div>

          <input
            ref={fileInputRef}
            style={S.fileInput}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
          />

          <p style={S.dragHint}>💡 Drag images to reorder them. Portfolio order affects how they display on your store page.</p>

          {/* Gallery */}
          {portfolio.length > 0 ? (
            <div style={S.gallery}>
              {portfolio.map((image, index) => (
                <div
                  key={image.id}
                  style={{
                    ...S.galleryItem,
                    opacity: draggedIndex === index ? 0.5 : 1,
                    border: dragOverIndex === index ? "2px solid #1a1a2e" : "none",
                    cursor: draggedIndex !== null ? "grabbing" : "grab",
                  }}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={() => handleDropReorder(index)}
                  onMouseEnter={(e) => e.currentTarget.querySelector('[data-delete]').style.opacity = "1"}
                  onMouseLeave={(e) => e.currentTarget.querySelector('[data-delete]').style.opacity = "0"}
                >
                  <img
                    src={`${process.env.REACT_APP_IMG_URL}/${image.image_path}`}
                    alt="Portfolio"
                    style={S.galleryImg}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Error';
                    }}
                  />

                  {dragOverIndex === index && (
                    <div style={S.dragOverlay}>Drop here to reorder</div>
                  )}

                  <button
                    data-delete
                    style={{ ...S.deleteBtn, opacity: 0 }}
                    onClick={() => handleDelete(image.id)}
                    title="Delete image"
                  >
                    <DeleteIcon style={{ fontSize: 16 }} />
                  </button>

                  {uploadProgress[image.id] !== undefined && (
                    <div style={{ position: "absolute", bottom: "8px", left: "8px", right: "8px", background: "rgba(0,0,0,0.5)", height: "4px", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "#1a1a2e", width: `${uploadProgress[image.id]}%`, transition: "width 0.3s" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={S.emptyState}>
              <div style={S.emptyTitle}>No portfolio images yet</div>
              <div style={S.emptyText}>Upload images to showcase your salon's work and portfolio</div>
            </div>
          )}

          {portfolio.length > 0 && (
            <div style={{ marginTop: "20px", padding: "16px", background: "#f5f4f0", borderRadius: "8px", fontSize: "13px", color: "#555" }}>
              📊 Total images: <strong>{portfolio.length}</strong>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPortfolioPage;