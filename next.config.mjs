// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr',
        pathname: '/cms/resource/**'
      }
    ]
  }
};
