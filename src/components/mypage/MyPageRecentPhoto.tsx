'use client';

import { useEffect, useState } from 'react';
import { useGetAlbumListQuery } from '@/hooks/queries/query/useAlbumQuery';

import Image from 'next/image';
import Link from 'next/link';
import useUserId from '@/hooks/auth/useUserId';

const RecentPhoto = () => {
  const userId = useUserId();
  const { data: albumListData, isLoading, isError } = useGetAlbumListQuery(userId);
  const [recentPhotos, setRecentPhotos] = useState<any[]>([]);

  useEffect(() => {
    if (albumListData) {
      const sortedPhotos = [...albumListData]
        .sort
        // (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        ();
      setRecentPhotos(sortedPhotos.slice(0, 3));
    }
  }, [albumListData]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  if (isError) {
    const errorMessage = '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }

  //사진이 3개이하면 안보여줌
  if (recentPhotos.length < 3) return null;

  return (
    <div className="my-4">
      <h2 className="mt-2 text-base font-semibold text-gray-900">최근여행지</h2>

      <div className="-mx-6 mt-2 flex space-x-4 overflow-x-auto px-4">
        {recentPhotos.map((photo) => (
          <Link
            href={`/photo-album`}
            key={photo.id}
            className="relative h-[220px] w-[327px] flex-shrink-0 overflow-hidden rounded-lg"
          >
            <Image src={photo.photoImg} alt="최근 여행지 이미지" fill style={{ objectFit: 'cover' }} priority />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPhoto;
