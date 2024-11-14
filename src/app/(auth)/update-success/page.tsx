import React from 'react';
import { Metadata } from 'next';
import UpdateSuccess from '@/components/auth/update/UpdateSuccess';

export const metadata: Metadata = {
  title: '비밀번호 변경완료',
  description: '비밀번호 변경완료 페이지입니다.'
};

const UpdateSuccessPage = () => {
  return (
    <div>
      <div className="mt-20"></div>
      <UpdateSuccess />
    </div>
  );
};

export default UpdateSuccessPage;
