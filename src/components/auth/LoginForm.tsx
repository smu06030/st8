'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/utils/auth/loginValidation';
import { useSocialLogin } from '@/hooks/auth/useSocialLogin';
import { LoginFormInputs } from '@/types/auth/auth.type';
import { useAuthListener } from '@/hooks/auth/useAuthListener';

import Icon from '@/components/common/Icons/Icon';
import Link from 'next/link';
import Button from '@/components/common/Buttons/Button';
import LinkButton from '@/components/common/Buttons/LinkButton';
import InputField from '@/components/common/InputField/InputField';
import SocialLoginButton from '@/components/common/Buttons/SocialLoginButton';

const LoginForm = () => {
  const { loginWithProvider } = useSocialLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm<LoginFormInputs>({ mode: 'onChange' });
  const router = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Supabase Auth 상태 변경 리스너
  useAuthListener();

  const onHandleLogin = async (data: LoginFormInputs) => {
    const success = await handleLogin(data.email, data.password, setError);
    if (success) {
      router.push('/home');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao') => {
    try {
      await loginWithProvider(provider);
      router.push('/home');
    } catch (error) {
      console.error(`${provider} 로그인 중 오류 발생:`, error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mr-[185px] mt-3 flex flex-col">
        <p className="mb-2 hidden text-2xl font-semibold text-secondary-900 lg:block">로그인</p>
        <p className="mb-2 hidden text-gray-700 lg:block">모아랑 여행을 떠나요.</p>
      </div>
      <form
        onSubmit={handleSubmit(onHandleLogin)}
        className="flex min-h-screen flex-col items-center space-y-12 lg:mt-7"
      >
        <InputField
          iconName="MailIcon"
          text="이메일"
          placeholder="이메일을 입력해주세요."
          status={errors.email ? 'error' : 'default'}
          register={{
            ...register('email', {
              required: true
            })
          }}
          error={errors.email}
        />

        <InputField
          iconName="LockIcon"
          text="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type={showConfirmPassword ? 'text' : 'password'}
          status={errors.password ? 'error' : 'default'}
          register={{
            ...register('password', {
              required: true
            })
          }}
          error={errors.password}
          rightIcon={
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
            </button>
          }
        />

        <div className="flex w-full max-w-sm justify-between px-3 pt-8">
          <div></div>
          <Link href="/reset-password" className="text-right text-sm font-normal text-gray-600">
            아이디/비밀번호 찾기
          </Link>
        </div>
        <div className="!mt-3">
          <Button text="로그인" variant={isValid ? 'blue' : 'gray'} disabled={!isValid} type="submit" />
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <SocialLoginButton onLogin={handleSocialLogin} />
        </div>

        <div className="text-center lg:!mt-14">
          <span className="mr-1 text-sm text-gray-600">아직 회원이 아니신가요?</span>
          <LinkButton text="회원가입" href="/signup" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
