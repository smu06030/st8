'use client';

import { useEffect, useState } from 'react';
import useUserStore from '../../store/authStore'; // Zustand 스토어 가져오기
import supabase from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

const useProfile = () => {
  const { nickname, clearUser, setUser } = useUserStore(); // Zustand 스토어 사용
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          setError('로그인 정보가 없습니다.');
          return;
        }

        const userId = sessionData.session.user.id;

        const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

        if (error) {
          setError('프로필 정보를 불러오지 못했습니다.');
        } else {
          setUser({
            email: sessionData.session.user.email,
            nickname: data.nickname
          });
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchProfile();
  }, [setUser]);

  const onHandleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.error) {
        setError('로그아웃 실패: ' + data.error);
      } else {
        clearUser();
        router.push('/login');
      }
    } catch (error) {
      setError('로그아웃 중 문제가 발생했습니다.');
    }
  };

  return { nickname, error, onHandleLogout };
};

export default useProfile;
