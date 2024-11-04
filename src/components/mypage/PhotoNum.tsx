'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

const PhotoNum = () => {
  const [photoCount, setPhotoCount] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchPhotoCount = async () => {
      try {
        // 현재 로그인된 사용자 정보 가져오기
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          console.error('로그인 정보가 없습니다.');
          return;
        }

        const userId = sessionData.session.user.id;

        // 해당 사용자의 스탬프 개수 조회
        const { count, error } = await supabase.from('album').select('*', { count: 'exact' }).eq('user_id', userId);

        if (error) {
          console.error('사진 개수를 불러오는 중 오류:', error);
          return;
        }

        setPhotoCount(count);
      } catch (err) {
        console.error('데이터를 불러오는 중 오류:', err);
      }
    };

    fetchPhotoCount();
  }, [supabase]);

  return (
    <Link href="/photo-album">
      <div className="items-left relative flex h-[156px] flex-col justify-center rounded-2xl bg-gray-800 p-6 text-white">
        <p className="text-[14px] font-semibold">나의 추억들</p>
        <p className="mt-1 text-[12px]">
          내가 지나간곳
          <br />
          내가 남긴 사진들
        </p>
        <span className="mt-4 font-bold text-[20px]">{photoCount !== null ? `${photoCount}장` : '로딩 중...'}</span>
      </div>
    </Link>
  );
};

export default PhotoNum;
