'use client';
import { useEffect, useState, MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Buttons/Button';
import LinkButton from '@/components/common/Buttons/LinkButton';
import SocialLoginButton from '@/components/common/Buttons/SocialLoginButton';
import { checkEmailExists, loginWithEmailAndPassword } from '@/app/api/auth/authService';
import Icon from '@/components/common/Icons/Icon';
import browserClient from '@/utils/supabase/client';
import InputField from '../common/InputField/InputField';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

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
    clearErrors,
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
          // router.push('/');
          window.location.href = '/';
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const handleEmailBlur = async (email: string) => {
    clearErrors('email');
    const exists = await checkEmailExists(email);
    if (!exists) {
      setError('email', {
        type: 'manual',
        message: '등록되지 않은 이메일입니다.'
      });
    }
  };

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
      router.push('/');
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
    <form onSubmit={handleSubmit(onHandleLogin)} className="mt-7 flex min-h-screen flex-col items-center space-y-12">
      <InputField
        iconName="MailIcon"
        text="이메일"
        placeholder="이메일을 입력해주세요."
        status={errors.email ? 'error' : 'default'}
        register={register('email', {
          required: '이메일을 입력해주세요.',
          onBlur: (e) => handleEmailBlur(e.target.value)
        })}
        error={errors.email}
      />

      <InputField
        iconName="LockIcon"
        text="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type={showConfirmPassword ? 'text' : 'password'}
        status={errors.password ? 'error' : 'default'}
        register={register('password', {
          required: '비밀번호를 입력해주세요.'
        })}
        error={errors.password}
        rightIcon={
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
      />

      <div className="flex w-full max-w-sm justify-between px-8 pt-14">
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

      <div className="!mt-[180px] text-center lg:!mt-14">
        <span className="mr-1 text-sm text-gray-600">아직 회원이 아니신가요?</span>
        <LinkButton text="회원가입" href="/signup" />
      </div>
    </form>
  );
};

export default LoginForm;
