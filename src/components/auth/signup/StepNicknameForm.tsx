import { useForm } from 'react-hook-form';

import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';

interface NicknameStepProps {
  onNext: (nickname: string) => void;
}

interface NicknameFormInputs {
  nickname: string;
}

const NicknameStep = ({ onNext }: NicknameStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<NicknameFormInputs>({ mode: 'onChange' });

  const onSubmit = (data: NicknameFormInputs) => {
    onNext(data.nickname);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <span className="mb-6 w-full text-left font-bold text-4xl text-secondary-700">
        모아에게 <br /> 이름을 알려주세요.
      </span>

      <InputField
        iconName="UserIcon"
        placeholder="이름을 입력해주세요."
        text="이름"
        status={errors.nickname ? 'error' : 'default'}
        register={register('nickname', {
          required: '이름을 입력해주세요.'
        })}
        error={errors.nickname}
      />
      <div className="mt-[420px] lg:mt-[380px]">
        <Button text="다음으로" variant={isValid ? 'blue' : 'gray'} disabled={!isValid} type="submit" />
      </div>
    </form>
  );
};

export default NicknameStep;
