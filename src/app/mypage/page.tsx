'use client';

import { useEffect, useState } from 'react';
import useUserStore from '../../store/authStore'; // Zustand 스토어 가져오기
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabase/client';

const MyPage = () => {
  const { nickname, clearUser, setUser } = useUserStore(); // Zustand 스토어 사용
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (nickname) {
      console.log('현재 Zustand 닉네임 상태:', nickname);
    }

    const fetchProfile = async () => {
      try {
        // 현재 로그인된 유저의 세션 정보 가져오기
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          setError('로그인 정보가 없습니다.');
          return;
        }

        const userId = sessionData.session.user.id;

        // nickname 가져오기
        const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

        if (error) {
          setError('프로필 정보를 불러오지 못했습니다.');
          console.error('Supabase 프로필 조회 오류:', error);
        } else {
          // 프로필 정보를 Zustand 상태로 저장
          setUser({
            email: sessionData.session.user.email,
            nickname: data.nickname
          });
          console.log('Zustand에 저장될 유저 정보:', {
            email: sessionData.session.user.email,
            nickname: data.nickname
          });
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('프로필 데이터를 가져오는 중 오류:', err);
      }
    };

    fetchProfile();
  }, [setUser, nickname]);

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
        // 로그아웃 성공 시 Zustand 상태 초기화
        clearUser();
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
      <h1>마이페이지</h1>
      <h3>닉네임: {nickname ? nickname : 'guest'}</h3>

      <button onClick={onHandleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;
