import { useRouter } from 'next/navigation';
import supabase from '@/utils/supabase/client';

const getRedirectUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_REDIRECT_URL_LOCAL
    : process.env.NEXT_PUBLIC_REDIRECT_URL_PRODUCTION;
};

export const useSocialLogin = () => {
  const router = useRouter();

  const loginWithProvider = async (provider: 'kakao' | 'google') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getRedirectUrl()
      }
    });
    if (error) throw error;
    router.push('/mypage');
    return data;
  };

  return { loginWithProvider };
};
