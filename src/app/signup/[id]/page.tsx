'use client';
import { useRouter, useParams } from 'next/navigation';
import StepNicknameForm from '@/components/auth/signup/StepNicknameForm';
import StepEmailForm from '@/components/auth/signup/StepEmailForm';
import StepPasswordForm from '@/components/auth/signup/StepPasswordForm';

const SignupStepPage = () => {
  const router = useRouter();
  const { step } = useParams();

  const renderForm = () => {
    switch (step) {
      case 'nickname':
        return <StepNicknameForm onNext={() => router.push('/signup/email')} />;
      case 'email':
        return <StepEmailForm onNext={() => router.push('/signup/password')} />;
      case 'password':
        return <StepPasswordForm onNext={() => router.push('/mypage')} />;
      default:
        return <div>잘못된 경로입니다</div>;
    }
  };

  return (
    <div>
      <h1>회원가입 - {step === 'nickname' ? '닉네임 입력' : step === 'email' ? '이메일 입력' : '비밀번호 입력'}</h1>
      {renderForm()}
    </div>
  );
};

export default SignupStepPage;
