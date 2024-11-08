'use server';

import { createClient } from '@/utils/supabase/server';

// 로그인 유저 정보 가져오기
export const getUser = async () => {
  const serverClient = createClient();

  const {
    data: { user },
    error
  } = await serverClient.auth.getUser();

  if (error || !user) {
    console.error(error);
    return;
  }

  return user;
};
