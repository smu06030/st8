import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { email, password, nickname } = await req.json();

    // 필수 정보가 모두 있는지 확인
    if (!email || !password || !nickname) {
      return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

    // Supabase에서 회원가입 처리
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 500 });
    }

    // users 테이블에 추가 정보 저장
    const { error: insertError } = await supabase.from('profile').insert([{ email, nickname }]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error('!!!!!!', err);
    return NextResponse.json({ error: '회원가입 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
