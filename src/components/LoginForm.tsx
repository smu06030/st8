'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onHandleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        // 로그인 성공 시 페이지 이동
        router.push('/mypage');

        // 입력 필드 초기화
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold">로그인</h1>
      <div>
        <p>이메일</p>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-defaultcolor h-auto w-[326px] border p-3"
        />
        <p>비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-defaultcolor h-auto w-[326px] border p-3"
        />
        <p>다른 서비스 계정 로그인</p>
        <button onClick={onHandleLogin} className="bg-defaultcolor h-auto w-[326px] p-3 font-bold text-gray-500">
          로그인
        </button>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default LoginForm;
