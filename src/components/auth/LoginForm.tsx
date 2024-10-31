'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { login } from '@/utils/supabase/auth';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { loginWithProvider } = useSocialLogin(); // 소셜 로그인 훅
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onHandleLogin = async (data: LoginFormInputs) => {
    try {
      const result = await login(data.email, data.password); // Server Action 호출
      if (result) {
        router.push('/mypage');
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다: ');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold">로그인</h1>
      <form onSubmit={handleSubmit(onHandleLogin)} className="flex flex-col items-center space-y-4">
        <input
          {...register('email', { required: '이메일을 입력해주세요' })}
          placeholder="이메일"
          className="h-auto w-[326px] border border-defaultcolor p-3"
        />
        <input
          {...register('password', { required: '비밀번호를 입력해주세요' })}
          placeholder="비밀번호"
          className="h-auto w-[326px] border border-defaultcolor p-3"
        />
        <button type="submit" className="h-auto w-[326px] bg-defaultcolor p-3 font-bold text-gray-500">
          로그인
        </button>

        <button onClick={() => loginWithProvider('kakao')} className="mt-4 h-auto w-[326px] bg-yellow-500 p-3">
          카카오로 로그인
        </button>
        <button onClick={() => loginWithProvider('google')} className="mt-4 h-auto w-[326px] bg-blue-500 p-3">
          구글로 로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
