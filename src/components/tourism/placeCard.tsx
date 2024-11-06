'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import updateBookmarkStatus from '@/hooks/useUpdateBookmark';
import Link from 'next/link';
import useUser from '@/hooks/useUser';

interface PlaceCardProps {
  firstimage: string | null;
  description: string;
  contentid: string;
  title: string;
  isBookmarked: boolean;
  onRemoveBookmark?: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  firstimage,
  description,
  contentid,
  title,
  isBookmarked: initialBookmarked, // 초기 북마크 상태로 설정
  onRemoveBookmark
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(initialBookmarked);
  const userId = useUser();

  // 북마크 추가 또는 해제 함수
  const onBookmarkClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!userId) {
      console.log('로그인이 필요합니다.');
      return;
    }

    try {
      await updateBookmarkStatus(contentid, userId, isBookmarked, title, description);
      setIsBookmarked(!isBookmarked);
      console.log(`북마크 ${isBookmarked ? '해제' : '추가'} 성공`);
    } catch (error) {
      console.error('북마크 업데이트 중 오류:', error);
      alert('북마크 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="relative h-[374px] w-[100%] overflow-hidden rounded-3xl bg-[#1d1d1d]/70">
      <Link href={`/tourism-detail/${contentid}`} passHref>
        <Image
          src={firstimage ? firstimage : '/placeholder.png'}
          fill
          priority
          alt={description || '이미지 설명 없음'}
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 rounded-3xl bg-[#1d1d1d]/70"></div>
      </Link>
      <button
        onClick={onBookmarkClick}
        className={`absolute right-[18px] top-5 z-20 flex h-14 w-14 items-center justify-center rounded-full ${isBookmarked ? 'text-yellow-500' : 'text-gray-500'} bg-[#4e4e4e]/60`}
      >
        <Icon name="BookMarkIcon2" size={64} color={isBookmarked ? '#FFD700' : 'white'} />
      </button>
      <div className="absolute bottom-[42px] left-[36px] right-[36px] flex flex-col justify-end text-left text-white">
        <Link href={`/tourism-detail/${contentid}`} passHref>
          <p className="break-keep text-xl font-semibold leading-[31.20px]">{description}</p>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCard;
