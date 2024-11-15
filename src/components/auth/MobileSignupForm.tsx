'use client';

import NicknameStep from '@/components/auth/signup/StepNicknameForm';
import EmailStep from '@/components/auth/signup/StepEmailForm';
import PasswordStep from '@/components/auth/signup/StepPasswordForm';
import GoMainStep from '@/components/auth/signup/StepMainForm';
import { useSignupFormState } from '@/hooks/useSignupFormState';
import { signUpWithEmail } from '@/app/api/auth/authService';

const MobileSignupForm = () => {
  const { step, formData, handleNext } = useSignupFormState();

  const handleSignup = async () => {
    try {
      const response = await signUpWithEmail(formData.nickname, formData.email, formData.password);
      window.location.href = '/';
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
  //       if (result.error.message.includes('already registered')) {
  //         alert('이미 등록된 이메일입니다. 로그인 페이지로 이동합니다.');
  //         {
  //           router.push('/login');
  //         }
  //       } else {
  //         throw new Error(result.error.message);
  //       }
  //     }

  return (
    <div className="flex flex-col items-center">
      {/* <div className="mr-[180px] mt-7 flex flex-col">
        <p className="mb-2 hidden text-2xl font-semibold text-secondary-900 lg:block">회원가입</p>
        <p className="mb-2 hidden text-gray-700 lg:block">모아랑 여행을 떠나요.</p>
      </div> */}

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
