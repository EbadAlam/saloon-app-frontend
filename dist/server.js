"use strict";

require("ignore-styles");
// require("@babel/register")({
//   extensions: [".js", ".jsx"],
//   ignore: [/node_modules/],
//   presets: ["@babel/preset-env", "@babel/preset-react"]
// });
// require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const PORT = 3000;
const app = express();

app.get("/health", (req, res) => {
  res.send("✅ Server working on Vercel");
});
app.listen(PORT, () => {
  console.log(`✅ SSR server running`);
});
// module.exports = app;