import browserClient from '@/utils/supabase/client';

//로그인 유저 아이디 가져오기
export const fetchUser = async () => {
  const { data, error } = await browserClient.auth.getUser();
  if (error || !data?.user) {
    console.log('error');
  }
  return data.user?.id;
};
fetchUser();
