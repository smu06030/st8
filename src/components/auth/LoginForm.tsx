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

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글 상태
  const { loginWithProvider } = useSocialLogin(); // 소셜 로그인 훅
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  // 입력 필드 값 감지
  const email = watch('email');
  const password = watch('password');

  // 이메일과 비밀번호가 모두 입력되었을 때만 버튼 활성화
  const isFormFilled = email && password;

  const onHandleLogin = async (data: LoginFormInputs) => {
    try {
      const result = await login(data.email, data.password);
      if (result) {
        router.push('/mypage');
      }
      reset();
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다: ');
    }
  };

  return (
    <div className="min-h-screen flex-col justify-between">
      <h1 className="mb-4 text-center font-bold">로그인</h1>
      <form onSubmit={handleSubmit(onHandleLogin)} className="flex flex-col items-center space-y-[24px]">
        <InputField
          icon={<Icon name="MailIcon" />}
          label="이메일"
          placeholder="이메일을 입력해주세요."
          register={register('email')}
          error={!!errors.email}
          // errorMessage={errors.password ? '등록되지 않은 비밀번호입니다.' : undefined}
          errorMessage="등록되지 않은 이메일입니다."
        />
        <InputField
          icon={<Icon name="LockIcon" />}
          error={!!errors.email}
          // errorMessage={errors.password ? '등록되지 않은 비밀번호입니다.' : undefined}
          errorMessage="등록되지 않은 비밀번호입니다."
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type={showPassword ? 'text' : 'password'} // 상태에 따라 비밀번호 타입 변경
          register={register('password')}
          rightIcon={
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
            </button>
          }
        />

        <div className="flex w-full justify-center gap-20">
          <label className="flex items-center text-gray-700">
            <input type="checkbox" className="mr-2" />
            자동 로그인
          </label>
          <a href="/find-id-password" className="text-gray-700">
            아이디/비밀번호 찾기
          </a>
        </div>

        <Button
          label="로그인"
          variant={isFormFilled ? 'blue' : 'gray'}
          disabled={!isFormFilled}
          onClick={handleSubmit(onHandleLogin)}
        />

        <div className="flex justify-center space-x-[16px]">
          <button
            onClick={() => loginWithProvider('google')}
            className="shadow-md h-[50px] w-[50px] rounded-full bg-white p-1"
          >
            <img src="/images/apple-icon.png" alt="apple Login" className="rounded-full" />
          </button>

          <button
            onClick={() => loginWithProvider('google')}
            className="shadow-md h-[50px] w-[50px] rounded-full bg-white p-3"
          >
            <img src="/images/google-icon.png" alt="Google Login" />
          </button>

          <button
            onClick={() => loginWithProvider('kakao')}
            className="shadow-md h-[50px] w-[50px] rounded-full bg-[#FEE500] px-3"
          >
            <img src="/images/kakao-icon.png" alt="Kakao Login" />
          </button>
        </div>
        <div className="mb-4 flex items-center justify-center space-x-2">
          <span className="text-[14px] text-gray-600">아직 회원이 아니신가요?</span>
          <LinkButton label="회원가입" href="/signup" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
