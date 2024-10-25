'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '../store/authStore';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

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
        // Zustand에 저장
        setUser({
          email: data.email,
          nickname: data.nickname
        });
        router.push('/mypage');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={onHandleLogin}>로그인</button>
    </div>
  );
};

export default LoginForm;
