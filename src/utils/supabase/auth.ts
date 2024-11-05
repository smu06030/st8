import { profile } from 'console';
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
async function checkEmailExists(email: string) {
  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('email')
    .eq('email', email)
    .single();

  console.log(profileError);
  return !!profileData;
}
// 로그인
export const login = async (email: string, password: string) => {
  console.log('>>>');
  console.log(email, password);
  const emailCheck = await checkEmailExists(email);
  console.log(emailCheck);
  if (emailCheck) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      return {
        success: false,
        type: 'password'
        // message: '등록되지 않은 비밀번호입니다.'
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
      // message: '등록되지 않은 이메일입니다.'
    };
  }
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
