import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
};

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import browserClient from '@/utils/supabase/client';

// const CallbackPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//         error
//       } = await browserClient.auth.getUser();
//       if (user) {
//         router.push('/mypage');
//       } else if (error) {
//         alert('로그인 오류가 발생했습니다: ' + error.message);
//         router.push('/login');
//       }
//     };

//     fetchUser();
//   }, [router]);

//   return <p>로그인 중...</p>;
// };

// export default CallbackPage;

// //소셜 로그인 인증 후의 콜백 처리
