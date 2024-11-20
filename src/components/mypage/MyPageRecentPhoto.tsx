'use client';

import { useEffect, useState } from 'react';
import { useGetAlbumListQuery } from '@/hooks/queries/query/useAlbumQuery';

import Link from 'next/link';
import Image from 'next/image';
import useUserId from '@/hooks/auth/useUserId';
import Icon from '../common/Icons/Icon';

interface RecentPhotoProps {
  limit?: number; // 최대 표시할 사진 수
  containerStyle?: string; // 컨테이너 스타일
}

const RecentPhoto = ({ limit = 3, containerStyle = '' }: RecentPhotoProps) => {
  const userId = useUserId();
  const { data: albumListData, isLoading, isError } = useGetAlbumListQuery(userId);
  const [recentPhotos, setRecentPhotos] = useState<any[]>([]);

  useEffect(() => {
    if (albumListData) {
      const sortedPhotos = [...albumListData].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setRecentPhotos(sortedPhotos.slice(0, limit)); // 제한된 수의 사진 표시
    }
  }, [albumListData, limit]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  if (isError) {
    const errorMessage = '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }

  if (!recentPhotos || recentPhotos.length === 0) return null;

  return (
    <div className={`my-4 ${containerStyle}`}>
      <div className="mt-2 text-base font-semibold text-gray-900 lg:mb-4 lg:text-2xl">
        <span className="block lg:hidden">최근 여행지</span>
      </div>
      <p className="items-center justify-center font-semiBold text-2xl leading-[31.20px] text-gray-900 lg:flex mo-only:hidden">
        추억 모음
      </p>
      <p className="flex items-center justify-center text-sm leading-tight text-gray-600 lg:mt-2 mo-only:hidden">
        최근에 찍은 사진을 확인해 보세요.
      </p>
      <Link href={'/photo-album'} className="mo-only:hidden">
        <div className="mb-10 mt-4 flex items-center justify-center gap-1">
          <p className="-mb-[1px] text-sm leading-tight text-secondary-600">최근 여행지 구경하기</p>
          <Icon name="ArrowIcon" size={14} color="#00b4ef" />
        </div>
      </Link>

      <div className="-mx-6 mt-2 flex space-x-4 overflow-x-auto px-4 lg:mx-[180px] lg:mb-[271px] lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
        {recentPhotos.map((photo) => (
          <Link
            href={`/photo-album`}
            key={photo.id}
            className="relative h-[220px] w-[327px] flex-shrink-0 overflow-hidden rounded-lg lg:h-[250px] lg:w-full"
          >
            <Image src={photo.photoImg} alt="최근 여행지 이미지" fill style={{ objectFit: 'cover' }} priority />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPhoto;
