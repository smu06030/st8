'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useUserId from '@/hooks/useUserId';
import { getPhotoCount } from '@/apis/photoCount';

const PhotoCount = () => {
  const userId = useUserId();

  const {
    data: photoCount,
    isLoading,
    isError
  } = useQuery<number>({
    queryKey: ['photoCount', userId],
    queryFn: () => getPhotoCount(userId),
    enabled: !!userId
  });

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-700">
        데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
      </div>
    );
  }

  return (
    <Link href="/photo-album">
      <div className="items-left relative flex h-[156px] flex-col justify-center rounded-2xl bg-gray-800 p-6 text-white">
        <p className="text-[14px] font-semibold">나의 추억들</p>
        <p className="mt-1 text-[12px]">
          내가 지나간곳
          <br />
          내가 남긴 사진들
        </p>
        <span className="mt-4 font-bold text-[20px]">{`${photoCount}장`}</span>
      </div>
    </Link>
  );
};

export default PhotoCount;
