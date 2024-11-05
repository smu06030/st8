import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Buttons/Button';
import Icon from '@/components/common/Icons/Icon';

interface NicknameStepProps {
  onNext: (nickname: string) => void;
}

interface NicknameFormInputs {
  nickname: string;
}

const NicknameStep: React.FC<NicknameStepProps> = ({ onNext }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<NicknameFormInputs>();

  // 입력 필드 값 감지
  const nickname = watch('nickname');

  // 닉네임이 입력되었을 때만 버튼 활성화
  const isFormFilled = !!nickname;

  const handleNext = (data: NicknameFormInputs) => {
    if (isFormFilled) {
      onNext(data.nickname);
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
        icon={<Icon name="UserIcon" />}
        label="이름"
        placeholder="이름을 입력해주세요."
        register={register('nickname', { required: '이름을 입력해주세요' })}
      />
      <Button
        label="다음으로"
        variant={isFormFilled ? 'blue' : 'gray'}
        disabled={!isFormFilled}
        onClick={handleSubmit(handleNext)}
      />
    </div>
  );
};

export default NicknameStep;
