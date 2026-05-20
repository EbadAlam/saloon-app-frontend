
require("ignore-styles");
// require("@babel/register")({
//   extensions: [".js", ".jsx"],
//   ignore: [/node_modules/],
//   presets: ["@babel/preset-env", "@babel/preset-react"],
// });
// require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
const App = require("../src/App").default;
const axios = require("axios");
const { HelmetProvider } = require("react-helmet-async");
const PORT = 3000;
const app = express();
const { SnackbarProvider } = require("../src/contexts/SnackBarContext");

app.use(express.static(path.resolve(__dirname, "../build"), { index: false }));
app.get("/health", (req, res) => {
  res.send("✅ Server working on Vercel");
});
app.get("/stores/:slug", async (req, res) => {
  const { slug } = req.params;

  const response = await axios.get(
    `https://gardencitykhi.com/new-site/backend/public/api/getStoreBySlug/${slug}`
  );
  const storeDetails = response.data.storeDetails;
  const helmetContext = {};
  const appHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={req.url}>
        <SnackbarProvider>
        <App initialData={storeDetails} />
        </SnackbarProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  const indexFile = path.resolve(__dirname, "../build/index.html");
  fs.readFile(indexFile, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Failed to read index.html:", err);
      return res.status(500).send("An error occurred");
    }

    const finalHtml = htmlData
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace(
        "</head>",
        `<title>${storeDetails.title}</title><meta name="description" content="${storeDetails.about}" /></head>`
      )
      .replace(
        "</body>",
        `<script>window.__INITIAL_DATA__=${JSON.stringify({
          storeDetails,
        }).replace(/</g, "\\u003c")}</script></body>`
      );

    res.send(finalHtml);
  });
});
app.get("/sitemap.xml", async (req, res) => {
  try {
    const response = await axios.get("https://gardencitykhi.com/new-site/backend/public/api/getAllStoresSlug");
    const stores = response.data.stores || [];

    const baseUrl = "https://saloon-app-frontend.vercel.app";

    const staticUrls = [
      "",
      "help-and-support",
      "blogs",
      "for-business",
      "pricing",
      "status",
    ].map(path => `${baseUrl}/${path}`);

    const dynamicUrls = stores.map(store => `${baseUrl}/stores/${store.slug}`);

    const urls = [...staticUrls, ...dynamicUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      url => `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>${url.includes("/stores/") ? "0.8" : "1.0"}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Error creating sitemap:", err);
    res.status(500).send("Could not generate sitemap");
  }
});
app.get(/^\/.*$/, (req, res) => {
  const helmetContext = {};
  const appHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={req.url}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  const indexFile = path.resolve(__dirname, "../build/index.html");
  fs.readFile(indexFile, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Failed to read index.html:", err);
      return res.status(500).send("An error occurred");
    }

    const finalHtml = htmlData
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace(
        "</head>",
        `${helmet.title.toString()}${helmet.meta.toString()}</head>`
      );

    res.send(finalHtml);
  });
});

app.listen(PORT, () => {
  console.log(`✅ SSR server running`);
});
// module.exports = app;