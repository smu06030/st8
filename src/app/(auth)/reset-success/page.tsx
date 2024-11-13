import React from 'react';
import { Metadata } from 'next';
import ResetSuccess from '@/components/auth/reset/ResetSuccess';

export const metadata: Metadata = {
  title: '메일 발송완료',
  description: '메일 발송완료  페이지입니다.'
};

const ResetSuccessPage = () => {
  return <ResetSuccess />;
};

export default ResetSuccessPage;