/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "links.papareact.com",
      "bayut-production.s3.eu-central-1.amazonaws.com",
    ],
  },
  env: {
    MAPBOX_TOKEN:
      "pk.eyJ1IjoiZGV2bWFoaWFuIiwiYSI6ImNsMTBybmxiZjA3dXMzanJ6bWU0Z29pcmEifQ.sCvHvY7FOvrofMHn6hrQcg",
    BAYUT_API_KEY: "f5e153c0c6msh29f2bdb7028b126p1fe0f5jsn3fa25ffd5423",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
