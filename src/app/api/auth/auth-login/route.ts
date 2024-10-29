import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { email, password } = await req.json();

    // 필수 정보가 있는지 확인
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해주세요.' });
    }

    // Supabase 인증 처리
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      // 인증 실패 시 에러 반환
      return NextResponse.json({ error: authError.message });
    }

    // 인증 성공 후, users 테이블에서 사용자 확인
    const { data: userData, error: userError } = await supabase.from('profile').select('*').eq('id', authData.user.id);

    if (userError || !userData) {
      // users 테이블에 사용자가 없다면 회원가입으로 리다이렉트
      return NextResponse.json({ message: '사용자를 찾을 수 없습니다. 회원가입 페이지로 이동합니다.' });
    }

    // users 테이블에 사용자가 있으면 로그인 성공
    return NextResponse.json({ message: '로그인에 성공했습니다.', user: authData.user });
  } catch (err) {
    console.error('로그인 중 오류:', err);
    return NextResponse.json({ error: '로그인 중 오류가 발생했습니다.' });
  }
}
