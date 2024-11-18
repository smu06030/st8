import { useEffect, useState } from 'react';

import browserClient from '@/utils/supabase/client';

const useUserId = () => {
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

export default useUserId;
