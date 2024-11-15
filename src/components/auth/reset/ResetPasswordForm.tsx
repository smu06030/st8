'use client';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import browserClient from '@/utils/supabase/client';

interface FormValues {
  email: string;
}

const ResetPasswordForm = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>();
  const router = useRouter();

  const redirectUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;

      if (process.env.NODE_ENV === 'development') {
        return process.env.NEXT_PUBLIC_REDIRECT_URL_LOCAL || baseUrl;
      }

      return process.env.NEXT_PUBLIC_REDIRECT_URL_PRODUCTION || process.env.NEXT_PUBLIC_REDIRECT_URL_BETA || baseUrl;
    }
  }, []);

  // const redirectUrl = useMemo(() => {
  //   const baseUrl = window.location.origin;

  //   if (process.env.NODE_ENV === 'development') {
  //     return `${baseUrl}/login`;
  //   }

  //   return baseUrl;
  // }, []);

  const onSubmit = async (profile: FormValues) => {
    if (isRequesting) return;
    setIsRequesting(true);

    try {
      await browserClient.auth.resetPasswordForEmail(profile.email, {
        redirectTo: redirectUrl + '/updatePassword'
      });

      router.push('/reset-success');
    } catch (error) {
      console.error('비밀번호 재설정 이메일 전송 중 오류:', error);
    } finally {
      setIsRequesting(false);
    }
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
          })}
          status={errors.email ? 'error' : 'default'}
          error={errors.email}
        />
        <div className="mt-[420px] lg:mt-[380px]">
          <Button
            text="비밀번호 찾기"
            variant={isValid && !isRequesting ? 'blue' : 'gray'}
            disabled={!isValid || isRequesting}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
