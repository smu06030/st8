'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSocialLogin } from '@/hooks/auth/useSocialLogin';
import { useEffect, useState, MouseEvent } from 'react';
import { checkEmailExists, loginWithEmailAndPassword } from '@/app/api/auth/authService';

import Icon from '@/components/common/Icons/Icon';
import Link from 'next/link';
import Button from '@/components/common/Buttons/Button';
import LinkButton from '@/components/common/Buttons/LinkButton';
import InputField from '../common/InputField/InputField';
import browserClient from '@/utils/supabase/client';
import SocialLoginButton from '@/components/common/Buttons/SocialLoginButton';

interface LoginFormInputs {
  email: string;
  password: string;
}

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

  useEffect(() => {
    const {
      data: { subscription }
    } = browserClient.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        const {
          data: { user }
        } = await browserClient.auth.getUser();

        if (user) {
          window.location.href = '/home';
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const onHandleLogin = async (data: LoginFormInputs) => {
    const emailExists = await checkEmailExists(data.email);
    if (!emailExists) {
      setError('email', {
        type: 'manual',
        message: '등록되지 않은 이메일입니다.'
      });
      return;
    }

    const result = await loginWithEmailAndPassword(data.email, data.password);
    if (result.success) {
      window.location.href = '/home';
    } else {
      if (result.type === 'password') {
        setError('password', {
          type: 'manual',
          message: '비밀번호가 틀렸습니다.'
        });
      }
    }
  };

  const handleSocialLogin = (type: 'kakao' | 'google' | 'apple', e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithProvider(type);
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
              // onBlur: (e) => handleEmailBlur(e.target.value)
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
          <div>
            <input type="checkbox" className="mr-1" />
            <span className="text-sm font-normal text-[#4e4e4e]">자동 로그인</span>
          </div>
          <Link href="/reset-password" className="text-right text-sm font-normal text-[#4e4e4e]">
            아이디/비밀번호 찾기
          </Link>
        </div>
        <div className="!mt-3">
          <Button text="로그인" variant={isValid ? 'blue' : 'gray'} disabled={!isValid} type="submit" />
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <SocialLoginButton provider="apple" onClick={(e) => handleSocialLogin('apple', e)} />
          <SocialLoginButton provider="google" onClick={(e) => handleSocialLogin('google', e)} />
          <SocialLoginButton provider="kakao" onClick={(e) => handleSocialLogin('kakao', e)} />
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
