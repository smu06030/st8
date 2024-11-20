import { useForm } from 'react-hook-form';
import { checkEmailExists } from '@/app/api/auth/authService';

import Button from '@/components/common/Buttons/Button';
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
    formState: { errors, isValid }
  } = useForm<FormValues>({
    mode: 'onChange' // 입력 시점에서 유효성 검사
  });

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
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '유효한 이메일 주소를 입력해주세요.'
          },
          validate: async (email) => {
            try {
              const exists = await checkEmailExists(email);
              return exists ? '이미 사용 중인 이메일입니다.' : true;
            } catch {
              return '이메일 확인 중 오류가 발생했습니다.';
            }
          }
        })}
        status={errors.email ? 'error' : 'default'}
        error={errors.email}
      />

      <div className="mt-[420px] lg:mt-[380px]">
        <Button text="다음으로" variant={isValid ? 'blue' : 'gray'} disabled={!isValid} type="submit" />
      </div>
    </form>
  );
};

export default EmailStep;
