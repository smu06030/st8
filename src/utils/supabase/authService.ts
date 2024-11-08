import browserClient from '@/utils/supabase/client';

export const checkEmailExists = async (email: string) => {
  const { data: profileData } = await browserClient.from('profile').select('email').eq('email', email).single();
  return !!profileData;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  const emailCheck = await checkEmailExists(email);

  if (emailCheck) {
    const { error } = await browserClient.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      return { success: false, type: 'password' };
    }
    return { success: true };
  } else {
    return { success: false, type: 'email' };
  }
};

export const signUpWithEmail = async (nickname: string, email: string, password: string) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, email, password })
    });
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};

//supabase에서 이메일 또는 비밀번호 오류 상황을 클라이언트에 전달하는 로직
