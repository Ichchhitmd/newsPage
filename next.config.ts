import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Allow loading images from 'localhost'
  },
};

export default nextConfig;
