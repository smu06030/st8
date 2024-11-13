'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useUserId from '@/hooks/useUserId';
import { getPhotoCount } from '@/apis/photoCount';
import Image from 'next/image';

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
      <div className="relative flex h-[156px] flex-col justify-center overflow-hidden rounded-2xl bg-[#081425]/70 text-white">
        <Image src="/images/mypage_img.png" alt="배경 이미지" fill style={{ objectFit: 'cover' }} priority />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative flex h-full w-full flex-col p-6">
          <p className="text-[14px] font-semibold">나의 추억들</p>
          <p className="mt-1 text-xs">
            내가 지나간곳
            <br />
            내가 남긴 사진들
          </p>
          <span className="mt-4 font-bold text-xl">{`${photoCount}장`}</span>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCount;
