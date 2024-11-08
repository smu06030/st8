import React, { useState } from 'react';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import { checkEmailExists } from '@/app/api/auth/authService';

interface EmailStepProps {
  onNext: (email: string) => void;
}

const EmailStep = ({ onNext }: EmailStepProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'default' | 'active' | 'done' | 'error'>('default');

  const isFormFilled = !!email;

  const handleEmailBlur = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      setEmailStatus('error');
      setEmailError('유효한 이메일 주소를 입력해주세요. ✖');
      return false;
    }

    const exists = await checkEmailExists(email);
    if (exists) {
      setEmailStatus('error');
      setEmailError('이미 사용 중인 이메일입니다. ✖');
      return false;
    } else {
      setEmailStatus('done');
      setEmailError(null);
      return true;
    }
  };

  const handleNext = async () => {
    const isValidEmail = await handleEmailBlur();
    if (isFormFilled && isValidEmail) {
      onNext(email);
    } else if (!isValidEmail) {
    }
  };

  return (
    <div className="fixed flex min-h-screen flex-col items-center space-y-6 px-6 py-8">
      <span className="mb-6 w-full text-left font-bold text-[32px] text-secondary-700">
        모아에게 <br /> 이메일을 알려주세요.
      </span>

      <InputField
        iconName="MailIcon"
        text="이메일"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailStatus('active');
          setEmailError(null);
        }}
        onBlur={handleEmailBlur}
        status={emailError ? 'error' : emailStatus}
      />

      {emailError && <p className="flex w-full items-center justify-end text-sm text-red-500">{emailError}</p>}
      <div className="!mt-[400px]">
        <Button
          text="다음으로"
          variant={isFormFilled && !emailError ? 'blue' : 'gray'}
          disabled={!isFormFilled || !!emailError}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default EmailStep;
