import { Metadata } from 'next';

import UpdatePasswordForm from '@/components/auth/update/UpdatePasswordForm';

export const metadata: Metadata = {
  title: '비밀번호 변경',
  description: '비밀번호 변경 페이지입니다.'
};

const UpdatePassword = () => {
  return (
    <div>
      <div className="mt-20"></div>
      <UpdatePasswordForm />
    </div>
  );
};

export default UpdatePassword;
