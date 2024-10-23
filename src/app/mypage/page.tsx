import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '마이 페이지',
  description: '마이 페이지입니다.'
};

const page = () => {
  return <div>mypage</div>;
};

export default page;
