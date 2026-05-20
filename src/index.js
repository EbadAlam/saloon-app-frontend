import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from "./contexts/SnackBarContext";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Snowfall from "react-snowfall";

const rootElement = document.getElementById("root");

const initialData = window.__INITIAL_DATA__ || {};
const helmetContext = {};
const app = (
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider>
            {/* <Snowfall radius={[0.5, 4.0]} color="#d8b4fe" /> */}
            <App initialData={initialData.storeDetails} />
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
  console.log("✅ Hydration complete");
} else {
  createRoot(rootElement).render(app);
  console.log("✅ client-side render complete");
}

reportWebVitals();
