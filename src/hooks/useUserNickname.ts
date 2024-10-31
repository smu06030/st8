import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';

const useUserNickname = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          setError('로그인 정보가 없습니다.');
          return;
        }

        const userId = sessionData.session.user.id;
        const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

        if (error) {
          setError('닉네임을 불러오는 중 오류가 발생했습니다.');
        } else {
          setNickname(data.nickname);
        }
      } catch (fetchError) {
        setError('닉네임을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchNickname();
  }, []);

  return { nickname, error };
};

export default useUserNickname;
