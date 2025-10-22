import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

function StoreGalleryPage() {
  const location = useLocation();
  const gallery = location.state?.gallery || [];
  const navigate = useNavigate();
    useEffect(() => {
        if (gallery.length === 0) {
        navigate(ROUTES.home);
        }
    }, [gallery, location.state?.slug, navigate]);
  const renderGallery = () => {
    const rows = [];
    let i = 0;

    while (i < gallery.length) {
      rows.push(
        <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <img
            src={`${process.env.REACT_APP_IMG_URL}/${gallery[i].image}`}
            alt=""
            style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
          />
        </div>
      );
      i++;

      if (i < gallery.length) {
        rows.push(
          <div key={`row-${i}`} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <img
              src={`${process.env.REACT_APP_IMG_URL}/${gallery[i].image}`}
              alt=""
              style={{
                flex: 1,
                height: "300px",
                borderRadius: "10px",
                objectFit: "cover"
              }}
            />
            {gallery[i + 1] && (
              <img
                src={`${process.env.REACT_APP_IMG_URL}/${gallery[i + 1].image}`}
                alt=""
                style={{
                  flex: 1,
                  height: "300px",
                  borderRadius: "10px",
                  objectFit: "cover"
                }}
              />
            )}
          </div>
        );
        i += 2;
      }
    }
    return rows;
  };

  return (
    <div style={{ padding: "20px" }}>
      {gallery.length > 0 ? renderGallery() : <p>No images in gallery</p>}
    </div>
  );
}

export default StoreGalleryPage;
