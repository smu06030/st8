'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

const StampNum = () => {
  const [stampCount, setStampCount] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchStampCount = async () => {
      try {
        // 현재 로그인된 사용자 정보 가져오기
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          console.error('로그인 정보가 없습니다.');
          return;
        }

        const userId = sessionData.session.user.id;

        // 해당 사용자의 스탬프 개수 조회
        const { count, error } = await supabase.from('stamp').select('*', { count: 'exact' }).eq('user_id', userId);

        if (error) {
          console.error('스탬프 개수를 불러오는 중 오류:', error);
          return;
        }

        setStampCount(count);
      } catch (err) {
        console.error('데이터를 불러오는 중 오류:', err);
      }
    };

    fetchStampCount();
  }, [supabase]);

  return (
    <Link href="/stamp-all">
      <div className="mb-4 flex cursor-pointer items-center justify-between rounded-2xl bg-gray-300 p-6">
        <span>
          지금까지 모은 <br />
          <span className="font-bold">스탬프</span>
        </span>
        <span className="text-2xl font-bold">{stampCount !== null ? `${stampCount}개` : '로딩 중...'}</span>
      </div>
    </Link>
  );
};

export default StampNum;
