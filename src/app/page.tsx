import { Metadata } from 'next';

import LandingPage from '@/components/landing/Landingpage';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: '서비스 소개 페이지 입니다.'
};

const page = () => {
  return <LandingPage />;
};

export default page;
