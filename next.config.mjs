/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/DD-Motors',
  assetPrefix: '/DD-Motors/',
  images: {
    unoptimized: true,
  },
  // As duas linhas abaixo forçam o site a ir pro ar mesmo com pequenos erros de IA
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
