'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { login } from '@/utils/supabase/auth';
import Button from '@/components/common/Buttons/Button';
import LinkButton from '@/components/common/Buttons/LinkButton';
import InputField from '@/components/common/InputField';
import Icon from '@/components/common/Icons/Icon';
import { useState } from 'react';
import Image from 'next/image';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { loginWithProvider } = useSocialLogin(); // 소셜 로그인 훅
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글
  const [isEmailError, setIsEmailError] = useState(false); // 이메일 오류
  const [isPasswordError, setIsPasswordError] = useState(false); // 비밀번호 오류
  const [emailStatus, setEmailStatus] = useState<'default' | 'active' | 'done'>('default');
  const [passwordStatus, setPasswordStatus] = useState<'default' | 'active' | 'done'>('default');
  const router = useRouter();

  // 입력 필드 값 감지
  const email = watch('email');
  const password = watch('password');

  // 이메일과 비밀번호가 모두 입력되었을 때만 버튼 활성화
  const isFormFilled = email && password;

  const onHandleLogin = async (data: LoginFormInputs) => {
    console.log(data);
    setIsPasswordError(false);
    setIsEmailError(false); // 기존 오류 상태 초기화
    const result = await login(data.email, data.password);

    if (result.success) {
      router.push('/mypage');
    } else {
      if (result.type === 'password') {
        setIsPasswordError(true); // 비밀번호 오류
        setPasswordStatus('done');
      } else {
        setIsEmailError(true); // 이메일 오류
        setEmailStatus('done');
      }
    }
  };

  return (
    <div className="m-[32px] min-h-screen flex-col justify-between">
      <form onSubmit={handleSubmit(onHandleLogin)} className="flex flex-col items-center justify-center space-y-[24px]">
        <InputField
          iconName="MailIcon"
          text="이메일"
          placeholder="이메일을 입력해주세요."
          value={email || ''}
          onChange={(e) => {
            setValue('email', e.target.value);
            setEmailStatus('active'); // 입력 중일 때 active로 변경
          }}
          onBlur={() => {
            console.log('Setting status to done or default based on error');
            setEmailStatus(isEmailError ? 'default' : 'done'); // 블러 시 상태 변경
          }}
          status={emailStatus}
        />

        {/* 이메일 오류 시 이미지 표시 */}
        {isEmailError && (
          <div className="mb-2 flex items-center space-x-1">
            <Image src="/images/login-email-alert1.png" alt="이메일 오류" width={160} height={160} />
          </div>
        )}

        <InputField
          iconName="LockIcon"
          text="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type={showPassword ? 'text' : 'password'} // 상태에 따라 비밀번호 타입 변경
          value={password || ''}
          onChange={(e) => {
            setValue('password', e.target.value);
            setPasswordStatus('active'); // 입력 중일 때 active로 변경
          }}
          onBlur={() => setPasswordStatus(isPasswordError ? 'done' : 'default')}
          status={passwordStatus}
          rightIcon={
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
            </button>
          }
        />

        {/* 비밀번호 오류 시 이미지 표시 */}
        {isPasswordError && (
          <div className="mb-2 flex items-center justify-end space-x-1">
            <Image src="/images/login-pass-alert1.png" alt="비밀번호 오류" width={168} height={168} />
          </div>
        )}

        <div className="mx-auto flex w-full max-w-md justify-between px-8">
          <label className="flex items-center text-gray-700">
            <input type="checkbox" className="mr-2 text-[14px]" />
            자동 로그인
          </label>
          <a href="/forgot-password" className="text-[14px] text-gray-700">
            아이디/비밀번호 찾기
          </a>
        </div>

        <Button
          text="로그인"
          variant={isFormFilled ? 'blue' : 'gray'}
          disabled={!isFormFilled}
          onClick={handleSubmit(onHandleLogin)}
        />

        <div className="flex justify-center space-x-[16px]">
          <button
            onClick={() => loginWithProvider('google')}
            className="shadow-md h-[50px] w-[50px] rounded-full bg-white p-1"
          >
            <Image src="/images/apple-icon.png" alt="apple Login" className="rounded-full" width={50} height={50} />
          </button>

          <button
            onClick={() => loginWithProvider('google')}
            className="shadow-md h-[50px] w-[50px] rounded-full bg-white p-3"
          >
            <Image src="/images/google-icon.png" alt="Google Login" width={50} height={50} />
          </button>

          <button
            onClick={() => loginWithProvider('kakao')}
            className="shadow-md h-[50px] w-[50px] rounded-full bg-[#FEE500] px-3"
          >
            <Image src="/images/kakao-icon.png" alt="Kakao Login" width={50} height={50} />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-center space-x-2">
          <span className="text-[14px] text-gray-600">아직 회원이 아니신가요?</span>
          <LinkButton text="회원가입" href="/signup" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
