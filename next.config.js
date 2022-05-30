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
};
