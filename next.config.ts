import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // All resizing/format conversion happens on ImageKit's CDN — see the
    // loader for details. Non-ImageKit URLs (Supabase uploads) pass through.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
};

export default nextConfig;
