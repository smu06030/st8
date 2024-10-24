'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onHandleLogin = async () => {
    try {
      console.log('>>');
      console.log(email);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.status === 302) {
        // 회원가입으로 리다이렉트
        alert('사용자를 찾을 수 없습니다. 회원가입 페이지로 이동합니다.');
        router.push('/signup');
      } else if (response.status === 401) {
        alert('로그인 실패: 잘못된 이메일 또는 비밀번호입니다.');
      } else if (response.status === 200) {
        alert('로그인 성공!');
        router.push('/mypage');
      } else {
        alert(`오류 발생: ${data.error}`);
      }
    } catch (err) {
      console.error('<<<<<<<<<<<<<<<<', err);
      alert('로그인 중 오류가 발생했습니다.');
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

export default LoginPage;
