'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import updateBookmarkStatus from '@/components/tourism/updateBookmark';
import Link from 'next/link';
import useUser from '@/hooks/useUser';

interface PlaceCardProps {
  firstimage: string | null;
  description: string;
  contentid: string;
  title: string;
  isBookmarked: boolean; // choose 값으로 전달받는 북마크 상태
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
      // 북마크 상태 업데이트 - title과 description 추가
      await updateBookmarkStatus(contentid, userId, isBookmarked, title, description);
      setIsBookmarked(!isBookmarked); // 상태 반전
      console.log(`북마크 ${isBookmarked ? '해제' : '추가'} 성공`);
    } catch (error) {
      console.error('북마크 업데이트 중 오류:', error);
      alert('북마크 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="relative h-[374px] w-[327px] min-w-[327px] cursor-pointer overflow-hidden rounded-3xl bg-[#1d1d1d]/70">
      <Link href={`/tourism-detail/${contentid}`} passHref>
        <div className="absolute inset-0">
          <Image
            src={firstimage ? firstimage : '/placeholder.png'}
            alt={description || '이미지 설명 없음'}
            layout="fill"
            objectFit="cover"
            className="rounded-[24px]"
          />
          <div className="absolute inset-0 rounded-3xl bg-[#1d1d1d]/70"></div>
        </div>
      </Link>
      <button
        onClick={onBookmarkClick}
        className={`absolute right-4 top-4 z-20 ${isBookmarked ? 'text-yellow-500' : 'text-gray-500'}`}
      >
        <Icon name="BookMarkIcon2" size={64} bgColor="#4e4e4e" rx="32" color={isBookmarked ? '#FFD700' : '#808080'} />
      </button>
      <div className="absolute bottom-[42px] left-[36px] flex h-[90px] w-[204px] flex-col justify-end text-left text-white">
        <Link href={`/tourism-detail/${contentid}`} passHref>
          <h3 className="text-xl font-semibold leading-tight">
            {description}, {title}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCard;
