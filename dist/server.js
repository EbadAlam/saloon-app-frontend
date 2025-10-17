"use strict";

require("ignore-styles");
require("@babel/register")({
  extensions: [".js", ".jsx"],
  ignore: [/node_modules/],
  presets: ["@babel/preset-env", "@babel/preset-react"]
});
require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const {
  StaticRouter
} = require("react-router-dom");
const App = require("../src/App").default;
const axios = require("axios");
const {
  HelmetProvider
} = require("react-helmet-async");
const PORT = 3000;
const app = express();
const {
  SnackbarProvider
} = require("../src/contexts/SnackBarContext");
app.use(express.static(path.resolve(__dirname, "../build"), {
  index: false
}));
app.get("/health", (req, res) => {
  res.send("✅ Server working on Vercel");
});
app.get("/stores/:slug", async (req, res) => {
  const {
    slug
  } = req.params;
  const response = await axios.get("https://gardencitykhi.com/new-site/backend/public/api/getStoreBySlug/".concat(slug));
  const storeDetails = response.data.storeDetails;
  const helmetContext = {};
  const appHtml = ReactDOMServer.renderToString(/*#__PURE__*/React.createElement(HelmetProvider, {
    context: helmetContext
  }, /*#__PURE__*/React.createElement(StaticRouter, {
    location: req.url
  }, /*#__PURE__*/React.createElement(SnackbarProvider, null, /*#__PURE__*/React.createElement(App, {
    initialData: storeDetails
  })))));
  const {
    helmet
  } = helmetContext;
  const indexFile = path.resolve(__dirname, "../build/index.html");
  fs.readFile(indexFile, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Failed to read index.html:", err);
      return res.status(500).send("An error occurred");
    }
    const finalHtml = htmlData.replace('<div id="root"></div>', "<div id=\"root\">".concat(appHtml, "</div>")).replace("</head>", "".concat(helmet.title.toString()).concat(helmet.meta.toString(), "</head>")).replace("</body>", "<script>window.__INITIAL_DATA__=".concat(JSON.stringify({
      storeDetails
    }).replace(/</g, "\\u003c"), "</script></body>"));
    res.send(finalHtml);
  });
});
app.get("/sitemap.xml", async (req, res) => {
  try {
    // Fetch your dynamic data
    // const response = await axios.get("https://gardencitykhi.com/new-site/backend/public/api/getAllStores");
    // const stores = response.data.stores.data || [];

    const baseUrl = "http://localhost:3000";

    // Build the list of URLs
    const staticUrls = ["", "help-and-support", "blogs", "for-business", "pricing", "status"].map(path => "".concat(baseUrl, "/").concat(path));

    // const dynamicUrls = stores.map(store => `${baseUrl}/stores/${store.slug}`);

    // const urls = [...staticUrls, ...dynamicUrls];
    const urls = staticUrls;

    // Generate XML
    const xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset \n  xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  ".concat(urls.map(url => "\n    <url>\n      <loc>".concat(url, "</loc>\n      <changefreq>weekly</changefreq>\n      <priority>").concat(url.includes("/stores/") ? "0.8" : "1.0", "</priority>\n    </url>")).join(""), "\n</urlset>");
    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Error creating sitemap:", err);
    res.status(500).send("Could not generate sitemap");
  }
});
app.get(/^\/.*$/, (req, res) => {
  const helmetContext = {};
  const appHtml = ReactDOMServer.renderToString(/*#__PURE__*/React.createElement(HelmetProvider, {
    context: helmetContext
  }, /*#__PURE__*/React.createElement(StaticRouter, {
    location: req.url
  }, /*#__PURE__*/React.createElement(SnackbarProvider, null, /*#__PURE__*/React.createElement(App, null)))));
  const {
    helmet
  } = helmetContext;
  const indexFile = path.resolve(__dirname, "../build/index.html");
  fs.readFile(indexFile, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Failed to read index.html:", err);
      return res.status(500).send("An error occurred");
    }
    const finalHtml = htmlData.replace('<div id="root"></div>', "<div id=\"root\">".concat(appHtml, "</div>")).replace("</head>", "".concat(helmet.title.toString()).concat(helmet.meta.toString(), "</head>"));
    res.send(finalHtml);
  });
});

// app.listen(PORT, () => {
//   console.log(`✅ SSR server running`);
// });
module.exports = app;