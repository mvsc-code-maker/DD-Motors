/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remova o basePath e o assetPrefix para funcionar na raiz da Vercel
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
