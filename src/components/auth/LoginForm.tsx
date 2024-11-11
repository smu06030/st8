'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import Button from '@/components/common/Buttons/Button';
import LinkButton from '@/components/common/Buttons/LinkButton';
import SocialLoginButton from '@/components/common/Buttons/SocialLoginButton';
import { checkEmailExists, loginWithEmailAndPassword } from '@/app/api/auth/authService';
import Icon from '@/components/common/Icons/Icon';
import browserClient from '@/utils/supabase/client';
import InputField from '../common/InputField/InputField';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { loginWithProvider } = useSocialLogin();
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
    register
  } = useForm<LoginFormInputs>({ mode: 'onChange' });
  const router = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 로그인 상태 변화를 감지하여 리다이렉트
  useEffect(() => {
    const { data: authListener } = browserClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/mypage'); // 로그인 후 자동 리다이렉트
      }
    });

    return () => {
      // authListener?.unsubscribe();
    };
  }, [router]);

  const handleEmailBlur = async (email: string) => {
    console.log(email);
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
    const result = await loginWithEmailAndPassword(data.email, data.password);

    if (result.success) {
      router.push('/mypage');
    } else {
      if (result.type === 'password') {
        alert('등록되지 않은 비밀번호입니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onHandleLogin)} className="mt-7 flex flex-col items-center space-y-6">
      <InputField
        iconName="MailIcon"
        text="이메일"
        placeholder="이메일을 입력해주세요."
        status={errors.email ? 'error' : 'default'}
        register={register('email', {
          // required: '이메일을 입력해주세요.',
          // pattern: {
          //   value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          //   message: '올바른 이메일 형식이 아닙니다.'
          // }
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
          // required: '비밀번호를 입력해주세요.'
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
          //   message: '8-16자의 영문, 숫자를 포함해야 합니다.'
          // }
        })}
        error={errors.password}
        rightIcon={
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
      />

      <div className="mt-16 flex w-full max-w-md justify-between px-8">
        <div>
          <input type="checkbox" className="mr-1" />
          <span className="text-sm font-normal text-[#4e4e4e]">자동 로그인</span>
        </div>
        <a href="/forgot-password" className="text-right text-sm font-normal text-[#4e4e4e]">
          아이디/비밀번호 찾기
        </a>
      </div>

      <Button
        text="로그인"
        variant={isValid ? 'blue' : 'gray'}
        disabled={!isValid}
        onClick={handleSubmit(onHandleLogin)}
      />

      <div className="mt-6 flex justify-center space-x-4">
        <SocialLoginButton provider="google" onClick={() => loginWithProvider('google')} />
        <SocialLoginButton provider="kakao" onClick={() => loginWithProvider('kakao')} />
      </div>

      <div className="mt-6 text-center">
        <span className="mr-1 text-sm text-gray-600">아직 회원이 아니신가요?</span>
        <LinkButton text="회원가입" href="/signup" />
      </div>
    </form>
  );
};

export default LoginForm;
