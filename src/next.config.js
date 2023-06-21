/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  target: "serverless",
  future: { webpack5: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};
