import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import browserClient from '@/utils/supabase/client';

export const useSocialLogin = () => {
  const router = useRouter();

  const redirectUrl = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.NEXT_PUBLIC_REDIRECT_URL_LOCAL;
    } else if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_REDIRECT_URL_BETA;
    }
  }, []);

  const loginWithProvider = async (provider: 'kakao' | 'google' | 'github') => {
    console.log(redirectUrl);
    try {
      const { data, error } = await browserClient.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          redirectTo: redirectUrl + '/auth/callback'
        }
      });
      if (error) {
        console.error('Social login error:', error.message);

        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      router.push('/home');
      return data;
    } catch (err) {
      console.error('social login error:', err);
    }
  };

  return { loginWithProvider };
};
