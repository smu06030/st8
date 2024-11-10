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
      const response = await signUpWithEmail(formData.nickname, formData.email, formData.password);
      // console.log('SignUp Response:', response);
      router.push('/');
    } catch (error: any) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  // const handleSignup = async () => {
  //   try {
  //     const response = await fetch('/api/auth/signup', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData)
  //     });
  //     const result = await response.json();

  //     if (result.error) {
  //       alert(result.error);
  //     } else {
  //       router.push('/');
  //     }
  //   } catch (err) {
  //     alert('회원가입 중 오류가 발생했습니다.');
  //   }
  // };

  return (
    <div className="mt-7 flex min-h-screen flex-col items-center space-y-6">
      {step === 0 && <NicknameStep onNext={(nickname: string) => handleNext({ nickname })} />}
      {step === 1 && <EmailStep onNext={(email: string) => handleNext({ email })} />}
      {step === 2 && <PasswordStep onNext={(password: string) => handleNext({ password })} />}
      {step === 3 && <GoMainStep onNext={handleSignup} />}
    </div>
  );
};

export default SignupForm;

//회원가입 폼의 다단계 입력 프로세스를 구현한 곳
