import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  // Using 'as any' to bypass the TypeScript strict check on 'experimental'
  experimental: {
    // Setting root here
    turbopack: { 
      root: './', 
    },
  } as any, 
};

export default nextConfig;