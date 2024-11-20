import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import browserClient from '@/utils/supabase/client';

export const useAuthListener = () => {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription }
    } = browserClient.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        const {
          data: { user }
        } = await browserClient.auth.getUser();

        if (user) {
          window.location.href = '/home';
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);
};
