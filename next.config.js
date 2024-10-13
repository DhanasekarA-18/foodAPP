/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  env: {
    RAZORPAY_KEY: "rzp_test_VliP97Q1oGSeTa",
    RAZORPAY_KEY_SECRETE: "pay215qWADlIT5HsySzKrXZu",
  },
};

module.exports = nextConfig;
