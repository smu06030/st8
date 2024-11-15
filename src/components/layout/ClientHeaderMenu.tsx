'use client';

import { useEffect, useState } from 'react';

import UserMenu from '../mypage/UserMenu';
import browserClient from '@/utils/supabase/client';

const ClientHeaderMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const { data } = await browserClient.from('profile').select('nickname').eq('id', user.id).single();

        if (data && data.nickname) {
          setNickname(data.nickname);
        } else {
          setNickname(''); // 기본값 또는 닉네임이 없을 때 처리
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserMenu
      isLoggedIn={isLoggedIn}
      nickname={nickname}
      initialNickname={nickname}
      tempNickname={nickname}
      checkUserStatus={nickname}
    />
  );
};

export default ClientHeaderMenu;
