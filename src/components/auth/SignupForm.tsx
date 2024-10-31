'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface SignupFormInputs {
  email: string;
  password: string;
  nickname: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormInputs>();
  const router = useRouter();

  const onHandleSignup = async (data: SignupFormInputs) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.error) {
        alert(result.error);
      } else {
        alert('회원가입 성공!');
        router.push('/login');
      }
    } catch (err) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex-col items-center justify-center bg-[#DDF3FC]">
      <h1 className="mb-4 text-center font-bold">회원가입</h1>
      <form onSubmit={handleSubmit(onHandleSignup)} className="flex flex-col items-center space-y-4">
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
        <input
          {...register('nickname', { required: '닉네임을 입력해주세요' })}
          placeholder="닉네임"
          className="h-auto w-[326px] border border-defaultcolor p-3"
        />
        <button type="submit" className="h-auto w-[326px] bg-defaultcolor p-3 font-bold text-gray-500">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
