import type { NextConfig } from "next";

// This is safe in modern Next.js as it compiles next.config.ts using SWC/esbuild
import { BACKEND_URL } from "./lib/config";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://smart-folio-backend.vercel.app/api/:path*`
      }
    ]
  }
};

export default nextConfig;
