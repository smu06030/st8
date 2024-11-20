import { checkEmailExists, loginWithEmailAndPassword } from '@/app/api/auth/authService';

export const handleLogin = async (email: string, password: string, setError: any) => {
  const emailExists = await checkEmailExists(email);
  if (!emailExists) {
    setError('email', {
      type: 'manual',
      message: '등록되지 않은 이메일입니다.'
    });
    return false;
  }

  const result = await loginWithEmailAndPassword(email, password);
  if (result.success) {
    return true;
  } else {
    if (result.type === 'password') {
      setError('password', {
        type: 'manual',
        message: '비밀번호가 틀렸습니다.'
      });
    }
    return false;
  }
};
