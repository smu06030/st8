'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onHandleLogin = async (data: LoginFormInputs) => {
    try {
      const response = await fetch('/api/auth/auth-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.error) {
        alert(result.error);
      } else {
        // 로그인 성공 시 페이지 이동
        router.push('/mypage');
      }
    } catch (err) {
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold">로그인</h1>
      <form onSubmit={handleSubmit(onHandleLogin)} className="flex flex-col items-center space-y-4">
        <div>
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register('email', { required: '이메일을 입력해주세요' })}
            className="h-auto w-[326px] border border-defaultcolor p-3"
          />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', { required: '비밀번호를 입력해주세요' })}
            className="h-auto w-[326px] border border-defaultcolor p-3"
          />
        </div>

        <button type="submit" className="h-auto w-[326px] bg-defaultcolor p-3 font-bold text-gray-500">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
