import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Buttons/Button';
import Icon from '@/components/common/Icons/Icon';

interface EmailStepProps {
  onNext: (email: string) => void;
}

interface EmailFormInputs {
  email: string;
}

const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<EmailFormInputs>();

  // 입력 필드 값 감지
  const email = watch('email');

  // 이메일이 입력되었을 때만 버튼 활성화
  const isFormFilled = !!email;

  const handleNext = (data: EmailFormInputs) => {
    if (isFormFilled) {
      onNext(data.email);
    } else {
      alert('이메일을 입력해주세요.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center space-y-6 px-6 py-8">
      <span className="text-secondary-700 mb-6 w-full max-w-[327px] text-left font-bold text-[32px]">
        모아에게 <br /> 이메일을 알려주세요.
      </span>
      <InputField
        icon={<Icon name="MailIcon" />}
        label="이메일"
        placeholder="이메일을 입력해주세요."
        register={register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '유효한 이메일 주소를 입력해주세요.'
          }
        })}
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

export default EmailStep;
