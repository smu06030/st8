import Button from '@/components/common/Buttons/Button';
import React from 'react';

interface StepMainFormProps {
  onNext: () => void;
}

const StepMainForm: React.FC<StepMainFormProps> = ({ onNext }) => {
  return (
    <div className="fixed flex flex-col items-center space-y-4">
      <h2>회원가입을 완료했어요!</h2>

      <Button text=" 이제, 여행을 떠나요" variant={'blue'} onClick={onNext} />
    </div>
  );
};

export default StepMainForm;
