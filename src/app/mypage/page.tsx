'use client';

import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase/client';

const MyPage = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 현재 로그인된 유저의 세션 정보 가져오기
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          setError('로그인 정보가 없습니다.');
          setLoading(false);
          return;
        }

        const userId = sessionData.session.user.id;

        // profile 테이블에서 nickname 가져오기
        const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

        if (error) {
          setError('프로필 정보를 불러오지 못했습니다.');
        } else {
          setNickname(data.nickname);
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>mypage</h1>
      <h3>nick: {nickname}</h3>
    </div>
  );
};

export default MyPage;
