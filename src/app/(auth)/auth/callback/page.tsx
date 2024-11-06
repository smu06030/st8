'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import browserClient from '@/utils/supabase/client';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      // 현재 세션을 확인하여 인증 완료 여부 체크
      // supabase에서는 소셜로그인 세션도 getSession에 자동으로 제공해주기에 따로 추가할 필요는 없음
      const { data, error } = await browserClient.auth.getSession();
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
