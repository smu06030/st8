import supabase from './client';

// 회원가입
export const signUp = async (email: string, password: string, nickname: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw new Error(`회원가입 실패: ${error.message}`);

  // 추가 정보(profile)에 저장
  const { error: profileError } = await supabase.from('profile').insert([{ id: data.user?.id, email, nickname }]);

  if (profileError) throw new Error(`프로필 저장 실패: ${profileError.message}`);

  return data;
};

// 로그인
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(`로그인 실패: ${error.message}`);
  return data;
};

//로그아웃
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(`로그아웃 실패: ${error.message}`);
  } catch (error) {
    throw new Error(`로그아웃 실패`);
  }
}
