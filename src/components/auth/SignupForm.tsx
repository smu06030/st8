'use client';

import { useRouter } from 'next/navigation';
import NicknameStep from './signup/StepNicknameForm';
import EmailStep from './signup/StepEmailForm';
import PasswordStep from './signup/StepPasswordForm';
import GoMainStep from './signup/StepMainForm';
import { useSignupFormState } from '@/hooks/useSignupFormState';
import { signUpWithEmail } from '@/app/api/auth/authService';

const SignupForm = () => {
  const { step, formData, handleNext } = useSignupFormState();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUpWithEmail(formData.nickname, formData.email, formData.password);
      router.push('/');
    } catch (error: any) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {step === 0 && <NicknameStep onNext={(nickname: string) => handleNext({ nickname })} />}
      {step === 1 && <EmailStep onNext={(email: string) => handleNext({ email })} />}
      {step === 2 && <PasswordStep onNext={(password: string) => handleNext({ password })} />}
      {step === 3 && <GoMainStep onNext={handleSignup} />}
    </div>
  );
};

export default SignupForm;

//회원가입 폼의 다단계 입력 프로세스를 구현한 곳
