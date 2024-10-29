import { NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function POST() {
  try {
    // Supabase에서 로그아웃 처리
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: '로그아웃 실패' });
    }

    return NextResponse.json({ message: '로그아웃 성공' });
  } catch (err) {
    console.error('로그아웃 중 오류 발생:', err);
    return NextResponse.json({ error: '서버 오류 발생' });
  }
}
