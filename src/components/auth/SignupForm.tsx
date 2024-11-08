'use client';

import { useRouter } from 'next/navigation';
import NicknameStep from '@/components/auth/signup/StepNicknameForm';
import EmailStep from '@/components/auth/signup/StepEmailForm';
import PasswordStep from '@/components/auth/signup/StepPasswordForm';
import GoMainStep from '@/components/auth/signup/StepMainForm';
import { useSignupFormState } from '@/hooks/useSignupFormState';
import { signUpWithEmail } from '@/app/api/auth/authService';

const SignupForm = () => {
  const { step, formData, handleNext } = useSignupFormState();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      console.log(formData);
      await signUpWithEmail(formData.nickname, formData.email, formData.password);
      router.push('/');
    } catch (error: any) {
      console.log(error);
      console.error('회원가입 중 오류 발생:', error.message || error); // 오류 메시지 출력
      console.error('오류 코드:', error.code || '코드가 없습니다');
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
