import React, { Suspense, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

const LocationPicker = ({ onChange, initialPosition = "" }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [MapComponents, setMapComponents] = useState(null);
   const [leafletLib, setLeafletLib] = useState(null);
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        import("leaflet"),
        import("react-leaflet"),
      ]).then(([Leaflet, ReactLeaflet]) => {
        delete Leaflet.Icon.Default.prototype._getIconUrl;
        Leaflet.Icon.Default.mergeOptions({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        setLeafletLib(Leaflet);
        setMapComponents(ReactLeaflet);
      });
    }
  }, []);
  const handleConfirm = async () => {
    if (position) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position?.lat}&lon=${position?.lng}`
        );
        const data = await res.json();
        const addr = data?.display_name || "";
        setAddress(addr);
        onChange({ lat: position?.lat, lng: position?.lng, address: addr });
      } catch (error) {
        console.error("Failed to fetch address:", error);
        onChange({ lat: position.lat, lng: position.lng, address: "" });
      }
    }
  };

  const handleAddressChange = async (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);

    if (newAddress.length > 3) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            newAddress
          )}`
        );
        const results = await res.json();
        if (results && results[0]) {
          const { lat, lon } = results[0];
          const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setPosition(newPos);
          onChange({ ...newPos, address: newAddress });
        }
      } catch (error) {
        console.error("Failed to search address:", error);
      }
    }
  };

  if (!MapComponents || !leafletLib) {
    return <div style={{ height: "400px", background: "#eee" }}>Loading map...</div>;
  }
  const { MapContainer, TileLayer, Marker, useMap, useMapEvents } = MapComponents;
  function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position?.lat, position.lng], map.getZoom());
    }
  }, [position, map]);
  return null;
}
const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={[position?.lat, position?.lng]} /> : null;
};
  return (
    <div>
      {/* 🔹 Address input field (manual entry) */}
      <TextField
        fullWidth
        label="Search Address"
        value={address}
        onChange={handleAddressChange}
        margin="normal"
      />
      <Suspense fallback={<div>Loading map...</div>}>
        <MapContainer
          center={[position?.lat || 24.8607, position?.lng || 67.0011]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker position={position} setPosition={setPosition} />
          <RecenterMap position={position} />
        </MapContainer>
      </Suspense>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={handleConfirm}
        disabled={!position}
      >
        Confirm Location
      </Button>
    </div>
  );
};
export default LocationPicker;