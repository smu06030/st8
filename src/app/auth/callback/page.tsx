'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/utils/supabase/client';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      // 현재 세션을 확인하여 인증 완료 여부 체크
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/mypage');
      } else if (error) {
        alert('로그인 오류가 발생했습니다: ' + error.message);
        router.push('/login');
      }
    };

    fetchSession();
  }, [router]);

  return <p>로그인 중...</p>;
};

export default CallbackPage;
