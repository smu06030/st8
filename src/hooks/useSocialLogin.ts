import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import browserClient from '@/utils/supabase/client';

export const useSocialLogin = () => {
  const router = useRouter();

  // useMemo를 사용하여 redirect URL을 한 번만 계산
  const redirectUrl = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.NEXT_PUBLIC_REDIRECT_URL_LOCAL || 'http://localhost:3000';
    }
    return process.env.NEXT_PUBLIC_REDIRECT_URL_PRODUCTION || 'https://st8-dev.vercel.app/';
  }, []);

  const loginWithProvider = async (provider: 'kakao' | 'google') => {
    try {
      const { data, error } = await browserClient.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          // redirectTo: redirectUrl
          redirectTo: redirectUrl + '/auth/callback'
        }
        // options: {
        //   redirectTo: redirectUrl
        // }
      });
      if (error) {
        console.error('Social login error:', error.message);

        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        return;
      }
      console.log(data);
      router.push('/mypage');
      return data;
    } catch (err) {
      console.error('social login error:', err);
    }
  };

  return { loginWithProvider };
};
