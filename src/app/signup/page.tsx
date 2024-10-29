import { Metadata } from 'next';
import SignupForm from '@/components/SignupForm';

export const metadata: Metadata = {
  title: '회원가입 페이지',
  description: '회원가입 페이지 입니다.'
};

const SignupPage = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
