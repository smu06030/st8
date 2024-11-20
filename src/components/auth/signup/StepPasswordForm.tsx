import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Icon from '@/components/common/Icons/Icon';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import SmailXIcon from '@/components/common/Icons/Auth/SmailXIcon';
import SmailCheckIcon from '@/components/common/Icons/Auth/SmailCheckIcon';

interface PasswordStepProps {
  onNext: (password: string) => void;
}

const PasswordStep = ({ onNext }: PasswordStepProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{ password: string; confirmPassword: string }>({
    mode: 'onChange'
  });

  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValidations = {
    hasMinLength: passwordValue.length >= 8,
    hasMaxLength: passwordValue.length <= 16,
    hasNumber: /\d/.test(passwordValue),
    hasLetter: /[A-Za-z]/.test(passwordValue),
    isMatching: passwordValue === confirmPasswordValue
  };

  const isPasswordValid =
    passwordValidations.hasMinLength &&
    passwordValidations.hasMaxLength &&
    passwordValidations.hasNumber &&
    passwordValidations.hasLetter &&
    passwordValidations.isMatching;

  const validationRules = [
    { label: '숫자 포함', isValid: passwordValidations.hasNumber },
    { label: '영문 포함', isValid: passwordValidations.hasLetter },
    {
      label: '8자리 이상 16자리 이하',
      isValid: passwordValidations.hasMinLength && passwordValidations.hasMaxLength
    }
  ];

  const onSubmit = (data: { password: string }) => {
    onNext(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-2">
      <span className="mb-6 w-full text-left font-bold text-4xl text-secondary-700">
        모아에게 비밀번호를 <br />
        알려주세요.
      </span>

      <InputField
        iconName="LockIcon"
        text="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type={showPassword ? 'text' : 'password'}
        status={errors.password ? 'error' : 'default'}
        rightIcon={
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
        register={register('password', {
          required: '비밀번호를 입력해주세요.'
        })}
      />

      <div className="!mt-8 flex w-full justify-end gap-2 text-xs">
        {validationRules.map(({ label, isValid }, index) => (
          <div key={index} className="flex items-center space-x-1">
            <span className={isValid ? 'text-secondary-700' : 'text-red-700'}>{label}</span>
            {isValid ? <SmailCheckIcon /> : <SmailXIcon />}
          </div>
        ))}
      </div>

      <InputField
        iconName="LockIcon"
        text="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        type={showConfirmPassword ? 'text' : 'password'}
        status={errors.confirmPassword ? 'error' : 'default'}
        register={register('confirmPassword', {
          // required: '비밀번호 확인을 입력해주세요.'
          // validate: (value) => (value === passwordValue ? true : '비밀번호가 동일하지 않습니다.')
        })}
        error={errors.confirmPassword}
        rightIcon={
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
      />

      <div className="!mt-8 flex w-full items-center justify-end space-y-6 text-xs">
        <div className="flex items-center">
          {passwordValidations.isMatching ? (
            <>
              <p className="mr-1 text-secondary-700">비밀번호가 동일합니다.</p>
              <SmailCheckIcon />
            </>
          ) : (
            <>
              <p className="mr-1 text-red-700">비밀번호가 동일하지 않습니다.</p>
              <SmailXIcon />
            </>
          )}
        </div>
      </div>

      <div className="!mt-[242px] lg:!mt-[205px]">
        <Button text="다음으로" variant={isPasswordValid ? 'blue' : 'gray'} disabled={!isPasswordValid} type="submit" />
      </div>
    </form>
  );
};

export default PasswordStep;
