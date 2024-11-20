/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr',
        pathname: '/cms/resource/**'
      }
    ],
    formats: ['image/avif', 'image/webp']
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

export default nextConfig;
