import SignupForm from '@/components/auth/SignupForm';
import Header from '@/components/common/header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입 페이지 입니다.'
};

const SignupPage = () => {
  return (
    <div>
      <Header title={String(metadata.title)} />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
