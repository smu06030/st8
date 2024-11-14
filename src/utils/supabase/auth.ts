import browserClient from './client';

export const signUp = async (email: string, password: string, nickname: string) => {
  const { data, error } = await browserClient.auth.signUp({
    email,
    password
  });

  if (error) throw new Error(`회원가입 실패: ${error.message}`);
  return data;
};

export const login = async (email: string, password: string) => {
  const { data, error } = await browserClient.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw new Error(`로그인 실패: ${error.message}`);
  return data;
};

export async function logout() {
  const { error } = await browserClient.auth.signOut();
  if (error) throw new Error(`로그아웃 실패: ${error.message}`);
}

//회원가입, 로그인, 로그아웃 기능을 처리, profile 테이블로 사용자 인증관련 작업 로직
