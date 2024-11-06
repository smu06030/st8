import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
  const serverClient = createClient();

  try {
    // Supabase에서 로그아웃 처리
    const { error } = await serverClient.auth.signOut();

    if (error) {
      return NextResponse.json({ error: '로그아웃 실패' });
    }

    return NextResponse.json({ message: '로그아웃 성공' });
  } catch (err) {
    console.error('로그아웃 중 오류 발생:', err);
    return NextResponse.json({ error: '서버 오류 발생' });
  }
}
