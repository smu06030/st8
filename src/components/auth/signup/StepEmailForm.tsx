import React, { useState } from 'react';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Buttons/Button';
import Icon from '@/components/common/Icons/Icon';

interface EmailStepProps {
  onNext: (email: string) => void;
}

const EmailStep = ({ onNext }: EmailStepProps) => {
  const [email, setEmail] = useState(''); // 이메일 상태
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'default' | 'active' | 'done'>('default'); // 상태 관리

  const isFormFilled = !!email; // 이메일이 입력되었을 때만 버튼 활성화

  const handleNext = () => {
    if (isFormFilled) {
      onNext(email);
    } else {
      alert('이메일을 입력해주세요.');
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
          setEmailStatus('active'); // 입력 중일 때 active 상태로 변경
          setEmailError(null); // 입력 시 오류 초기화
        }}
        onBlur={() => {
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (email && emailPattern.test(email)) {
            setEmailStatus('done'); // 유효한 이메일 형식일 경우 done 상태로 변경
          } else {
            setEmailStatus('default');
            setEmailError('유효한 이메일 주소를 입력해주세요.'); // 유효하지 않을 경우 오류 메시지 설정
          }
        }}
        status={emailStatus}
      />

      {emailError && <p className="text-sm text-red-500">{emailError}</p>}

      <Button text="다음으로" variant={isFormFilled ? 'blue' : 'gray'} disabled={!isFormFilled} onClick={handleNext} />
    </div>
  );
};

export default EmailStep;
