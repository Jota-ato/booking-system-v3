import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
      generator: {
        filename: "static/wasm/[hash][ext][query]",
      },
    });

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "@jsquash/webp": "commonjs @jsquash/webp",
        "@jsquash/resize": "commonjs @jsquash/resize",
      });
    }

    return config;
  },
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.julio-zavala.me",
      },
    ],
  },
};

export default nextConfig;
