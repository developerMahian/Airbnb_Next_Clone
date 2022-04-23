/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["links.papareact.com"],
  },
  env: {
    MAPBOX_TOKEN:
      "pk.eyJ1IjoiZGV2bWFoaWFuIiwiYSI6ImNsMTBybmxiZjA3dXMzanJ6bWU0Z29pcmEifQ.sCvHvY7FOvrofMHn6hrQcg",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
