import SignupForm from '@/components/auth/SignupForm';
import { Metadata } from 'next';

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
