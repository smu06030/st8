import supabase from './client';

// 회원가입
export const signUp = async (email: string, password: string, nickname: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw error;

  // 추가 정보(profile)에 저장
  const { error: profileError } = await supabase.from('profile').insert([{ id: data.user?.id, email, nickname }]);

  if (profileError) throw profileError;

  return data;
};

// 이메일 로그인
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

// 로그아웃
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
