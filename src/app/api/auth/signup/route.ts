import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { email, password, nickname } = await req.json();
    if (!email || !password || !nickname) {
      return NextResponse.json({ error: '모든 필드를 입력해주세요.' });
    }

    // Supabase에서 회원가입 처리
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message });
    }

    // 회원가입이 성공하면 profile 테이블에 정보 저장
    const { error: insertError } = await supabase
      .from('profile')
      .insert([{ id: signUpData.user?.id, email, nickname }]); // Supabase의 auth.user ID와 동기화

    if (insertError) {
      return NextResponse.json({ error: insertError.message });
    }

    return NextResponse.json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error('회원가입 중 오류:', err);
    return NextResponse.json({ error: '회원가입 중 오류가 발생했습니다.' });
  }
}
