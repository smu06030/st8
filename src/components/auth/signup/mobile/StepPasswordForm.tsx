import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PasswordStepProps } from '@/types/auth/auth.type';
import { passwordValidationRules, validatePassword } from '@/utils/auth/passwordValidation';

import Icon from '@/components/common/Icons/Icon';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import SmailXIcon from '@/components/common/Icons/Auth/SmailXIcon';
import SmailCheckIcon from '@/components/common/Icons/Auth/SmailCheckIcon';
import PasswordMatchStatus from '@/components/common/auth/PasswordMatchStatus';

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
  const passwordValidations = validatePassword(passwordValue, confirmPasswordValue);
  const validationRules = passwordValidationRules(passwordValidations);

  const isPasswordValid =
    passwordValidations.hasMinLength &&
    passwordValidations.hasMaxLength &&
    passwordValidations.hasNumber &&
    passwordValidations.hasLetter &&
    passwordValidations.isMatching;

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

      <div className="!mb-4 !mt-8 flex w-full justify-end gap-2 text-xs">
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
        register={register('confirmPassword')}
        error={errors.confirmPassword}
        rightIcon={
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
      />

      <div className="!mt-8 flex w-full items-center justify-end space-y-6 text-xs">
        <PasswordMatchStatus isMatching={passwordValidations.isMatching} />
      </div>

      <div className="!mt-[242px] lg:!mt-[205px]">
        <Button text="다음으로" variant={isPasswordValid ? 'blue' : 'gray'} disabled={!isPasswordValid} type="submit" />
      </div>
    </form>
  );
};

export default PasswordStep;
