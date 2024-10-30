'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const Profile = () => {
  const supabase = createClient();
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          router.push('/login');
          return;
        }

        const userId = sessionData.session.user.id;
        const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

        if (error) {
          setError('프로필 정보를 불러오지 못했습니다.');
        } else {
          setNickname(data.nickname);
        }
      } catch (fetchError) {
        console.error('프로필 데이터를 불러오는 중 오류가 발생했습니다:', fetchError);
        setError('프로필 데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchProfile();
  }, [router, supabase]);

  const onHandleUpdate = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) return;

      const userId = sessionData.session.user.id;
      const { error } = await supabase.from('profile').update({ nickname }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        router.push('/mypage');
      }
    } catch (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    }
  };

  const onHandleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.error) {
      } else {
        router.push('/login');
      }
    } catch (logoutError) {
      console.error('로그아웃 중 문제가 발생했습니다:', logoutError);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2 p-6">
      <div className="flex items-center space-x-2">
        <h1 className="font-bold text-xl">{nickname ? nickname : 'guest'}님</h1>
        <span className="text-l font-normal">의 내 정보입니다.</span>
      </div>
      <p className="mt-2">이름</p>
      <input
        type="text"
        placeholder="수정 닉네임을 입력해 주세요."
        value={nickname || ''}
        onChange={(e) => setNickname(e.target.value)}
        required
        className="h-auto w-[326px] border border-defaultcolor p-3"
      />
      <button onClick={onHandleUpdate} className="h-auto w-[326px] bg-defaultcolor p-3 font-bold text-gray-500">
        수정완료
      </button>
      <button onClick={onHandleLogout} className="text-gray-500">
        로그아웃
      </button>
    </div>
  );
};

export default Profile;
