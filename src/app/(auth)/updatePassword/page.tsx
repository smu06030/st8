import React from 'react';
import UpdatePasswordForm from '@/components/auth/UpdatePasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 변경',
  description: '비밀번호 변경 페이지입니다.'
};

const UpdatePassword = () => {
  return <UpdatePasswordForm />;
};

export default UpdatePassword;
