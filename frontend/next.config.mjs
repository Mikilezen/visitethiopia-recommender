/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
            remotePatterns: [
      {
        protocol: "https",
        hostname: "www.visitethiopia.et",
        pathname: "/**", // allow all paths
      },
    ],
    }
};

export default nextConfig;
