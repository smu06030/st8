'use client';

import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

const MyPage = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 현재 로그인된 유저의 세션 정보 가져오기
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          setError('로그인 정보가 없습니다.');
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
      }
    };

    fetchProfile();
  }, []);

  const onHandleLogout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.error) {
        alert('로그아웃 실패: ' + data.error);
      } else {
        alert('로그아웃 성공!');
        router.push('/login');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃 중 문제가 발생했습니다.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>mypage</h1>
      <h3>nick: {nickname}</h3>
      <button onClick={onHandleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;
