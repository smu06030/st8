'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { login } from '@/utils/supabase/auth';
import Button from '../common/Buttons/Button';
import LinkButton from '../common/Buttons/LinkButton';
import InputField from '../common/InputField';
import Icon from '../common/Icons/Icon';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
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
  //<LockIcon color="#23C9FF" />
  return (
    <div className="min-h-screen flex-col justify-between bg-[#E5F9FF]">
      <h1 className="mb-4 text-center font-bold">로그인</h1>
      <form onSubmit={handleSubmit(onHandleLogin)} className="flex flex-col items-center space-y-[24px]">
        <InputField label="이메일" placeholder="이메일을 입력해주세요." register={register('email')} />
        <InputField
          icon={<Icon name="LockIcon" color="#23C9FF" />} // 비밀번호 아이콘 추가
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          register={register('password')}
        />

        <Button
          label="로그인"
          variant={isFormFilled ? 'blue' : 'gray'}
          disabled={!isFormFilled}
          onClick={handleSubmit(onHandleLogin)}
        />

        <div className="flex justify-center space-x-[16px]">
          <button
            onClick={() => loginWithProvider('google')}
            className="shadow-md h-[50px] w-[50px] rounded-full bg-white p-3"
          >
            <img src="/images/google-icon.png" alt="Google Login" />
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
