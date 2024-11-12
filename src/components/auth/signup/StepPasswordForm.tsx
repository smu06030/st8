import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import Icon from '@/components/common/Icons/Icon';

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
  const hasMinLength = passwordValue.length >= 8;
  const hasNumber = /\d/.test(passwordValue);
  const hasLetter = /[A-Za-z]/.test(passwordValue);
  const isPasswordMatching = passwordValue === confirmPasswordValue;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          // required: '비밀번호를 입력해주세요. ✖',
          // validate: {
          //   hasMinLength: (value) => value.length >= 8 || '8자리 이상이어야 합니다. ✖',
          //   hasNumber: (value) => /\d/.test(value) || '숫자를 포함해야 합니다. ✖',
          //   hasLetter: (value) => /[A-Za-z]/.test(value) || '영문자를 포함해야 합니다. ✖'
          // }
        })}
        error={errors.password}
      />
      {/* 유효성 검사 표시 */}
      <div className="flex w-full items-center justify-end space-x-2 space-y-6 text-xs text-red-500">
        <p className={hasNumber ? 'text-secondary-700' : ''}></p>
        <p className={hasNumber ? 'text-secondary-700' : ''}>숫자 포함 {hasNumber ? '✔' : '✖'}</p>
        <p className={hasLetter ? 'text-secondary-700' : ''}>영문 포함 {hasLetter ? '✔' : '✖'}</p>
        <p className={hasMinLength ? 'text-secondary-700' : ''}>8자리 이상 {hasMinLength ? '✔' : '✖'}</p>
      </div>
      <InputField
        iconName="LockIcon"
        text="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        type={showConfirmPassword ? 'text' : 'password'}
        status={errors.confirmPassword ? 'error' : 'default'}
        register={register('confirmPassword', {
          //   required: '비밀번호를 다시 입력해주세요. ✖',
          //   validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다. ✖'
        })}
        error={errors.confirmPassword}
        rightIcon={
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
      />
      <div className="flex w-full items-center justify-end space-y-6 text-xs">
        <div></div>
        {isPasswordMatching ? (
          <p className="text-secondary-700">비밀번호가 동일합니다. ✔</p>
        ) : (
          <p className="text-red-500">비밀번호가 동일하지 않습니다. ✖</p>
        )}
      </div>

      <div className="!mt-[242px] lg:!mt-[205px]">
        <Button
          text="다음으로"
          variant={hasMinLength && hasNumber && hasLetter && isPasswordMatching ? 'blue' : 'gray'}
          disabled={!hasMinLength || !hasNumber || !hasLetter || !isPasswordMatching}
          type="submit"
        />
      </div>
    </form>
  );
};

export default PasswordStep;
