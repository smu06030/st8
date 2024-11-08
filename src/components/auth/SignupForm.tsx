'use client';

import { useRouter } from 'next/navigation';
import NicknameStep from './signup/StepNicknameForm';
import EmailStep from './signup/StepEmailForm';
import PasswordStep from './signup/StepPasswordForm';
import GoMainStep from './signup/StepMainForm';
import { useSignupFormState } from '@/hooks/useSignupFormState';
import { signUpWithEmail } from '@/utils/supabase/authService';

const SignupForm = () => {
  const { step, formData, handleNext } = useSignupFormState();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUpWithEmail(formData.nickname, formData.email, formData.password);
      router.push('/');
    } catch (error: any) {}
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
