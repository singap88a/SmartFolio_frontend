import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = isDev 
      ? 'http://localhost:5000' 
      : 'https://smart-folio-backend.vercel.app';

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
