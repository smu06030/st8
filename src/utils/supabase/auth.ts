import browserClient from './client';

export const signUp = async (email: string, password: string, nickname: string) => {
  const { data, error } = await browserClient.auth.signUp({
    email,
    password
  });

  if (error) throw new Error(`회원가입 실패: ${error.message}`);

  // 사용자 추가 정보(profile)에 저장
  if (data.user?.id) {
    const { error: profileError } = await browserClient.from('profile').insert([{ id: data.user.id, email, nickname }]);
    if (profileError) throw new Error(`프로필 저장 실패: ${profileError.message}`);
  } else {
    throw new Error('회원가입 성공했으나 사용자 ID를 찾을 수 없습니다.');
  }

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
