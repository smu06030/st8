import { useState, ChangeEvent } from 'react';

export const useConfirmPassword = (initialPassword: string) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'default' | 'active' | 'done' | 'error'>('default');
  const [error, setError] = useState<string | null>(null);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setStatus('active');
    setError(null);
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword === initialPassword) {
      setStatus('done');
      setError(null);
    } else {
      setStatus('error');
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const isMatching = confirmPassword === initialPassword;

  return {
    confirmPassword,
    status,
    error,
    isMatching,
    handleConfirmPasswordChange,
    handleConfirmPasswordBlur
  };
};

//비밀번호 확인 필드에서 비밀번호 일치 여부를 처리하는 로직
