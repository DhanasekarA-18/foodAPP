/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  env: {
    RAZORPAY_KEY: "rzp_test_VliP97Q1oGSeTa",
    RAZORPAY_KEY_SECRETE: "pay215qWADlIT5HsySzKrXZu",
    DOMAIN: 'https://food-c11ct25vl-dhanasekar-as-projects.vercel.app'
  },
};

module.exports = nextConfig;
