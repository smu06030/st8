'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const onHandleSignup = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, nickname })
      });

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert('회원가입 성공!');
        setEmail('');
        setPassword('');
        setNickname('');
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <button onClick={onHandleSignup}>회원가입하기</button>
    </div>
  );
};

export default SignupForm;
