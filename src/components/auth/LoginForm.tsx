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
      const result = await login(data.email, data.password);
      if (result) {
        router.push('/mypage');
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다: ');
    }
  };

  return (
    <div className="min-h-screen flex-col items-center justify-center bg-[#DDF3FC]">
      <h1 className="mb-4 text-center font-bold">로그인</h1>
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

        <div className="flex justify-center space-x-4">
          <button onClick={() => loginWithProvider('google')} className="shadow-md rounded-full bg-white p-3">
            <img src="/images/google-icon.png" alt="Google Login" className="h-10 w-10" />
          </button>

          <button onClick={() => loginWithProvider('kakao')} className="shadow-md rounded-full bg-[#FEE500] p-3">
            <img src="/images/kakao-icon.png" alt="Kakao Login" className="h-10 w-10 p-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
