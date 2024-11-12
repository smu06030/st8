'use client';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import browserClient from '@/utils/supabase/client';

interface FormValues {
  email: string;
}

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid }
  } = useForm<FormValues>({
    // mode: 'onChange'
  });

  const redirectUrl = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.NEXT_PUBLIC_REDIRECT_URL_LOCAL || 'http://localhost:3000';
    }
    return process.env.NEXT_PUBLIC_REDIRECT_URL_PRODUCTION || 'https://st8-dev.vercel.app/';
  }, []);

  const onSubmit = async (profile: FormValues) => {
    await browserClient.auth.resetPasswordForEmail(profile.email, {
      redirectTo: redirectUrl + '/updatePassword'
    });
  };

  return (
    <div className="mt-7 flex min-h-screen flex-col items-center justify-between">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <span className="mb-6 w-full text-left font-bold text-[32px] text-secondary-700">
          등록된 이메일로 <br /> 비밀번호를 변경합니다.
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
            }
            //   onBlur: (e) => handleEmailBlur(e.target.value),
            //   onChange: () => clearErrors('email')
          })}
          status={errors.email ? 'error' : 'default'}
          error={errors.email}
        />
        <div className="mt-8">
          <Button text="비밀번호 찾기" variant={isValid ? 'blue' : 'gray'} disabled={!isValid} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
