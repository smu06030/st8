import { Metadata } from 'next';

import SignupForm from '@/components/auth/signup/SignupForm';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입 페이지 입니다.'
};

const SignupPage = () => {
  return (
    <div>
      <div className="mt-20"></div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
