import browserClient from './client';

// 회원가입
export const signUp = async (email: string, password: string, nickname: string) => {
  const { data, error } = await browserClient.auth.signUp({
    email,
    password
  });
  if (error) throw new Error(`회원가입 실패: ${error.message}`);

  const { error: profileError } = await browserClient.from('profile').insert([{ id: data.user?.id, email, nickname }]);
  if (profileError) throw new Error(`프로필 저장 실패: ${profileError.message}`);

  return data;
};
async function checkEmailExists(email: string) {
  const { data: profileData, error: profileError } = await browserClient
    .from('profile')
    .select('email')
    .eq('email', email)
    .single();

  return !!profileData;
}
// 로그인
export const login = async (email: string, password: string) => {
  const emailCheck = await checkEmailExists(email);
  if (emailCheck) {
    const { data, error } = await browserClient.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      return {
        success: false,
        type: 'password'
      };
    } else {
      return {
        success: true
      };
    }
  } else {
    return {
      success: false,
      type: 'email'
    };
  }
};

//로그아웃
export async function logout() {
  try {
    const { error } = await browserClient.auth.signOut();
    if (error) throw new Error(`로그아웃 실패: ${error.message}`);
  } catch (error) {
    throw new Error(`로그아웃 실패`);
  }
}
