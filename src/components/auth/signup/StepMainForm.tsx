import Button from '@/components/common/Buttons/Button';
import SignupCompleteIcon from '@/components/common/Icons/SignupCompleteIcon';
import React from 'react';

interface StepMainFormProps {
  onNext: () => void;
}

const StepMainForm = ({ onNext }: StepMainFormProps) => {
  return (
    <div className="relative flex min-h-[calc(100vh-18rem)] flex-col items-center justify-between overflow-hidden">
      <div className="absolute mt-[20px]">
        <SignupCompleteIcon />
      </div>
      <h2 className="!mt-[200px] text-xl font-semibold">회원가입을 완료했어요!</h2>
      <div className="mb-[50px] flex w-full flex-col items-center justify-center px-6">
        <Button text="이제, 여행을 떠나요" variant="blue" onClick={onNext} />
      </div>
    </div>
  );
};

export default StepMainForm;
