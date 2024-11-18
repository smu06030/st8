import { Metadata } from 'next';
import LandingPage from '@/components/landing/Landingpage';

export const metadata: Metadata = {
  title: '국내 여행 스탬프 서비스 모아',
  description: '여행, 그리고 기록 여행기록부터 스탬프 수집까지 모아랑 함께.',
  keywords: ['여행', '국내여행', '스탬프', '모아', '여행기록'],
  authors: [{ name: '전국팔도 8조' }],
  icons: {
    icon: '/images/favicon.png'
  },
  openGraph: {
    images: [
      {
        url: '/images/moa_thumbnail.png',
        width: 1200,
        height: 630,
        alt: '국내 여행 스탬프 서비스 모아'
      }
    ]
  }
};

const page = () => {
  return <LandingPage />;
};

export default page;
