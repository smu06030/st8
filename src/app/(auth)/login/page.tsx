import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인 페이지입니다.'
};

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
