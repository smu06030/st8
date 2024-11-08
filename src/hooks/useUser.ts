import browserClient from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const useUser = () => {
  //로그인 유저 아이디 가져오기
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await browserClient.auth.getUser();
      if (error || !data?.user) {
        console.log('error');
        return;
      }
      setUserId(data.user.id);
    };
    fetchUser();
  }, []);

  return userId;
};

export default useUser;

// apis > user.ts

// 1. getUser() return user

// id를 뽑거나 user

// 커스텀 훅 user = getUser()
// return user.id
