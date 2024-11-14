import LandingPage from '@/components/landing/Landingpage';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: '서비스 소개 페이지 입니다.'
};

const page = () => {
  return <LandingPage />;
};

export default page;