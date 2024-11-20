'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/Icons/Icon';
import Button from '@/components/common/Buttons/Button';
import SmailXIcon from '@/components/common/Icons/Auth/SmailXIcon';
import InputField from '@/components/common/InputField/InputField';
import browserClient from '@/utils/supabase/client';
import SmailCheckIcon from '@/components/common/Icons/Auth/SmailCheckIcon';

interface FormValues {
  password: string;
}

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{ password: string; confirmPassword: string }>({
    mode: 'onChange'
  });

  const router = useRouter();

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

  const onSubmit = async (formData: FormValues) => {
    try {
      await Promise.all([
        browserClient.auth.updateUser({ password: formData.password }),
        fetch('/api/logout', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
      ]);

      router.push('/login');
    } catch (error) {
      console.error('비밀번호를 업데이트하는데 실패했습니다:', error);
    }
  };

  return (
    <div className="mt-7 flex min-h-screen flex-col items-center justify-between">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-2">
        <h1 className="mb-6 w-full text-left font-bold text-[32px] text-secondary-700">
          새로운 비밀번호를 <br />
          입력해주세요.
        </h1>

        <InputField
          iconName="LockIcon"
          text="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type={showPassword ? 'text' : 'password'}
          status={errors.password ? 'error' : 'default'}
          rightIcon={
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'Eye2Icon' : 'EyeIcon'} color="#A1A1A1" />
            </button>
          }
          register={register('password')}
        />

        <div className="!mt-8 flex w-full justify-end gap-2 text-xs">
          {[
            { label: '숫자 포함', isValid: passwordValidations.hasNumber },
            { label: '영문 포함', isValid: passwordValidations.hasLetter },
            {
              label: '8자리 이상 16자리 이하',
              isValid: passwordValidations.hasMinLength && passwordValidations.hasMaxLength
            }
          ].map(({ label, isValid }, index) => (
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
              <Icon name={showConfirmPassword ? 'Eye2Icon' : 'EyeIcon'} color="#A1A1A1" />
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

        <div className="mt-[420px] lg:mt-[380px]">
          <Button
            text="비밀번호 변경"
            variant={isPasswordValid ? 'blue' : 'gray'}
            disabled={!isPasswordValid}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
