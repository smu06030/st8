import { Metadata } from 'next';
<<<<<<< HEAD
import LoginForm from '../../components/LoginForm';
=======
import LoginForm from '@/components/LoginForm';
>>>>>>> 7b52ada6a2789f83296c6d6e21c2a2bf51023cb2

export const metadata: Metadata = {
  title: '로그인 페이지',
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
