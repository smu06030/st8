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
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold">회원가입</h1>
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
      <p>닉네임</p>
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
        className="border-defaultcolor h-auto w-[326px] border p-3"
      />
      <button onClick={onHandleSignup} className="bg-defaultcolor h-auto w-[326px] p-3 font-bold text-gray-500">
        회원가입하기
      </button>
    </div>
  );
};

export default SignupForm;
