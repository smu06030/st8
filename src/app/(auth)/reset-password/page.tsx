import React from 'react';

import { Metadata } from 'next';
import ResetPasswordForm from '@/components/auth/reset/ResetPasswordForm';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: '비밀번호 찾기 페이지입니다.'
};

const ResetPasswordPage = () => {
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
