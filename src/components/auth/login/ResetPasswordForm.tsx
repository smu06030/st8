'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import browserClient from '@/utils/supabase/client';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePasswordUpdate = async () => {
    setMessage('');
    setError('');
    const { error } = await browserClient.auth.updateUser({ password: newPassword });
    if (error) {
      setError('비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(error.message);
    } else {
      setMessage('비밀번호가 성공적으로 재설정되었습니다.');
      setTimeout(() => router.push('/login'), 2000); // 로그인 페이지로 리디렉트
    }
  };

  return (
    <div>
      <h1>새 비밀번호 설정</h1>
      <input
        type="password"
        placeholder="새 비밀번호를 입력하세요"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handlePasswordUpdate}>비밀번호 재설정</button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPasswordForm;
