import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Buttons/Button';
import { checkEmailExists } from '@/app/api/auth/authService';
import InputField from '@/components/common/InputField/InputField';

interface EmailStepProps {
  onNext: (email: string) => void;
}

interface FormValues {
  email: string;
}

const EmailStep = ({ onNext }: EmailStepProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    mode: 'onChange' // 입력 시점에서 유효성 검사
  });

  // 이메일 중복 확인 함수
  const handleEmailBlur = async (email: string) => {
    console.log('handleEmailBlur 호출됨');
    try {
      const exists = await checkEmailExists(email);
      console.log('Email exists:', exists);

      if (exists) {
        setError('email', { type: 'manual', message: '이미 사용 중인 이메일입니다. ✖' });
      } else {
        clearErrors('email');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setError('email', { type: 'manual', message: '이메일 확인 중 오류가 발생했습니다. ✖' });
    }
  };

  const onSubmit = (data: FormValues) => {
    if (isValid) {
      onNext(data.email);
    } else {
      console.error('유효성 검사 오류');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <span className="mb-6 w-full text-left font-bold text-4xl text-secondary-700">
        모아에게 <br /> 이메일을 알려주세요.
      </span>

      <InputField
        iconName="MailIcon"
        text="이메일"
        placeholder="이메일을 입력해주세요."
        register={register('email', {
          required: '이메일을 입력해주세요. ✖',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '유효한 이메일 주소를 입력해주세요. ✖'
          },
          onBlur: (e) => handleEmailBlur(e.target.value), // 이메일 중복 확인 함수 호출
          onChange: () => clearErrors('email')
        })}
        status={errors.email ? 'error' : 'default'}
        error={errors.email}
      />

      <div className="mt-8">
        <Button text="다음으로" variant={isValid ? 'blue' : 'gray'} disabled={!isValid} type="submit" />
      </div>
    </form>
  );
};

export default EmailStep;
