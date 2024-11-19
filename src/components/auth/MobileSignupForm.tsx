'use client';

import { signUpWithEmail } from '@/app/api/auth/authService';
import { useSignupFormState } from '@/hooks/auth/useSignupFormState';

import EmailStep from '@/components/auth/signup/StepEmailForm';
import GoMainStep from '@/components/auth/signup/StepMainForm';
import NicknameStep from '@/components/auth/signup/StepNicknameForm';
import PasswordStep from '@/components/auth/signup/StepPasswordForm';

const MobileSignupForm = () => {
  const { step, formData, handleNext } = useSignupFormState();

  const handleSignup = async () => {
    try {
      const response = await signUpWithEmail(formData.nickname, formData.email, formData.password);
      window.location.href = '/home';
    } catch (error: any) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex min-h-screen flex-col items-center justify-between lg:mt-7">
        {step === 0 && <NicknameStep onNext={(nickname: string) => handleNext({ nickname })} />}
        {step === 1 && <EmailStep onNext={(email: string) => handleNext({ email })} />}
        {step === 2 && <PasswordStep onNext={(password: string) => handleNext({ password })} />}
        {step === 3 && <GoMainStep onNext={handleSignup} />}
      </div>
    </div>
  );
};

export default MobileSignupForm;
