/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
  webpack(config, options) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    }
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },

  env: {
    STRAPI_CLIENT_URL: "http://localhost:1337/api",
  },
});
