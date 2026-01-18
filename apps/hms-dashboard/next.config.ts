import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Ignore TypeScript Errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Ignore ESLint Errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
