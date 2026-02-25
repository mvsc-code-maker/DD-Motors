/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/DD-Motors',
  assetPrefix: '/DD-Motors/',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
