import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    // Sin layout global, el 404 por defecto pierde el documento español.
    globalNotFound: true,
  },
};

export default nextConfig;
