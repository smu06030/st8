// /src/app/forgot-password/page.tsx
import ForgotPasswordForm from '@/components/auth/login/ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: '비밀번호를 재설정할 수 있는 이메일을 요청하는 페이지입니다.'
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
