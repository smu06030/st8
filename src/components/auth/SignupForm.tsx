'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NicknameStep from './signup/StepNicknameForm';
import EmailStep from './signup/StepEmailForm';
import PasswordStep from './signup/StepPasswordForm';
import GoMainStep from './signup/StepMainForm';

interface FormData {
  nickname: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ nickname: '', email: '', password: '' });
  const router = useRouter();

  const handleNext = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (result.error) {
        alert(result.error);
      } else {
        router.push('/');
      }
    } catch (err) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {step === 0 && <NicknameStep onNext={(nickname: string) => handleNext({ nickname })} />}
      {step === 1 && <EmailStep onNext={(email: string) => handleNext({ email })} />}
      {step === 2 && <PasswordStep onNext={(password: string) => handleNext({ password })} />}
      {step === 3 && <GoMainStep onNext={() => handleSignup()} />}
    </div>
  );
};

export default SignupForm;
