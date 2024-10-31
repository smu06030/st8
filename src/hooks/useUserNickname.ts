import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';

const useUserNickname = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndCreateProfile = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          setError('로그인 정보가 없습니다.');
          return;
        }

        const userId = sessionData.session.user.id;

        // Profile 테이블에서 사용자 프로필 확인
        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('nickname')
          .eq('id', userId)
          .single();

        if (profileError) {
          // 프로필이 없으면 새로 생성
          const { error: insertError } = await supabase.from('profile').insert([
            {
              id: userId,
              nickname: sessionData.session.user.user_metadata?.name || 'guest',
              email: sessionData.session.user.email
            }
          ]);

          if (insertError) {
            setError('프로필 생성 중 오류가 발생했습니다.');
          } else {
            setNickname(sessionData.session.user.user_metadata?.name || 'guest');
          }
        } else {
          // 기존 프로필이 있으면 닉네임 설정
          setNickname(profileData.nickname);
        }
      } catch (fetchError) {
        setError('닉네임을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchAndCreateProfile();
  }, []);

  return { nickname, error };
};

export default useUserNickname;
