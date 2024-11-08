'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import browserClient from '@/utils/supabase/client';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await browserClient.auth.getUser();
      if (user) {
        router.push('/mypage');
      } else if (error) {
        alert('로그인 오류가 발생했습니다: ' + error.message);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  return <p>로그인 중...</p>;
};

export default CallbackPage;

//소셜 로그인 인증 후의 콜백 처리
