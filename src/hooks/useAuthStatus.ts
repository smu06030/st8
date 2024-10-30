import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session); // 세션이 있으면 로그인 상태로 설정
    };

    checkSession();
  }, []);

  return isLoggedIn;
};

export default useAuthStatus;

//로그인 여부 확인 훅
