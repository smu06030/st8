'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import Icon from '@/components/common/Icons/Icon';
import browserClient from '@/utils/supabase/client';
import Router from 'next/router';

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

  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';
  const hasMinLength = passwordValue.length >= 8;
  const hasNumber = /\d/.test(passwordValue);
  const hasLetter = /[A-Za-z]/.test(passwordValue);
  const isPasswordMatching = passwordValue === confirmPasswordValue;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (profile: FormValues) => {
    try {
      await Promise.all([
        browserClient.auth.updateUser({ password: profile.password }),
        fetch('/api/logout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      ]);

      Router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-7 flex min-h-screen flex-col items-center justify-between">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-2">
        <span className="mb-6 w-full text-left font-bold text-[32px] text-secondary-700">
          새로운 비밀번호를 <br />
          입력해주세요.
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
          register={register('password', {})}
          error={errors.password}
        />

        {/* 유효성 검사 표시 */}
        <div className="flex w-full items-center justify-end space-x-2 space-y-6 text-xs text-red-700">
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
          register={register('confirmPassword', {})}
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
            <p className="text-red-700">비밀번호가 동일하지 않습니다. ✖</p>
          )}
        </div>

        <div className="mt-[420px] lg:mt-[380px]">
          <Button
            text="비밀번호 변경"
            variant={hasMinLength && hasNumber && hasLetter && isPasswordMatching ? 'blue' : 'gray'}
            disabled={!hasMinLength || !hasNumber || !hasLetter || !isPasswordMatching}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
