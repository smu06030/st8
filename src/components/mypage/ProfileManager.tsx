'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const useProfile = () => {
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const router = useRouter();

  // Supabase에서 닉네임을 실시간으로 가져오는 함수
  const fetchNickname = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        setError('로그인 정보가 없습니다.');
        return null;
      }

      const userId = sessionData.session.user.id;

      // 데이터베이스에서 닉네임 가져오기
      const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

      if (error) {
        setError('프로필 정보를 불러오지 못했습니다.');
        return null;
      }

      return data.nickname;
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      return null;
    }
  };

  useEffect(() => {
    // 페이지 로드 시 닉네임을 가져와서 상태에 표시
    const loadProfile = async () => {
      const nickname = await fetchNickname();
      setNickname(nickname);
    };

    loadProfile();
  }, []);

  const onHandleLogout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.error) {
        setError('로그아웃 실패: ' + data.error);
      } else {
        router.push('/login');
      }
    } catch (error) {
      setError('로그아웃 중 문제가 발생했습니다.');
    }
  };

  return { fetchNickname, nickname, error, onHandleLogout };
};

export default useProfile;
