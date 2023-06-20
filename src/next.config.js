/** @type {import('next').NextConfig} */
const nextConfig = {
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
};

module.exports = nextConfig;
