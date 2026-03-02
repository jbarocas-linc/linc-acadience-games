/** @type {import('next').NextConfig} */
const repo = 'linc-acadience-games';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
