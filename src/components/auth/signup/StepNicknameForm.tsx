import React, { useState } from 'react';

import Button from '@/components/common/Buttons/Button';
import Icon from '@/components/common/Icons/Icon';
import InputField from '@/components/common/InputField';

interface NicknameStepProps {
  onNext: (nickname: string) => void;
}

const NicknameStep = ({ onNext }: NicknameStepProps) => {
  const [nickname, setNickname] = useState(''); // 닉네임 상태 관리
  const [nicknameStatus, setNicknameStatus] = useState<'default' | 'active' | 'done'>('default'); // 상태 관리

  // 닉네임이 입력되었을 때만 버튼 활성화
  const isFormFilled = !!nickname;

  const handleNext = () => {
    if (isFormFilled) {
      onNext(nickname);
    } else {
      alert('이름을 입력해주세요.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center space-y-6 px-6 py-8">
      <span className="mb-6 w-full text-left font-bold text-[32px] text-secondary-700">
        모아에게 <br /> 이름을 알려주세요.
      </span>
      <InputField
        iconName="UserIcon"
        text="이름"
        placeholder="이름을 입력해주세요."
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
          setNicknameStatus('active'); // 입력 중일 때 active로 변경
        }}
        onBlur={() => setNicknameStatus(nickname ? 'done' : 'default')} // 입력 필드에서 벗어날 때 상태 변경
        status={nicknameStatus}
      />
      <div className="!mt-[400px]">
        <Button
          text="다음으로"
          variant={isFormFilled ? 'blue' : 'gray'}
          disabled={!isFormFilled}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default NicknameStep;
