import ResetPasswordForm from '@/components/auth/login/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '새 비밀번호 설정',
  description: '새 비밀번호를 설정하는 페이지입니다.'
};

const ResetPasswordPage = () => {
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
