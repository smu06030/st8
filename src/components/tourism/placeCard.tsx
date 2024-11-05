'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import { handleBookmarkClick, isBookmarkExists } from './bookMark';
import Link from 'next/link';

interface PlaceCardProps {
  imageUrl: string;
  description: string;
  userId: string;
  contentid: string;
  title: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ imageUrl, description, userId, contentid, title }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        // Supabase에서 북마크 존재 여부를 확인
        const bookmarkExists = await isBookmarkExists(userId, contentid);
        setIsBookmarked(bookmarkExists ? bookmarkExists.choose : false);
      } catch (error) {
        console.error('Failed to fetch bookmark status:', error);
        setIsBookmarked(false);
      } finally {
        setIsLoading(false);
      }
    };

    // 컴포넌트가 마운트될 때 북마크 상태를 불러오기
    fetchBookmarkStatus();
  }, [userId, contentid]);

  const onBookmarkClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isBookmarked === null) return;

    try {
      const bookmarkSuccess = await handleBookmarkClick(contentid, title, description);
      if (bookmarkSuccess) {
        setIsBookmarked((prev) => !prev);
      }
    } catch (error) {
      console.error('Error handling bookmark click:', error);
      alert('북마크 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative h-[374px] w-[327px] min-w-[327px] cursor-pointer overflow-hidden rounded-[24px] bg-gray-800">
      <Link href={`/tourism-detail/${contentid}`} passHref>
        <div className="absolute inset-0">
          <Image src={imageUrl} alt={description || '이미지 설명 없음'} fill className="rounded-[24px] object-cover" />
        </div>
      </Link>
      <button
        onClick={onBookmarkClick}
        className={`absolute right-4 top-4 z-20 ${isBookmarked ? 'text-yellow-500' : 'text-gray-500'}`}
      >
        <Icon name="BookMarkIcon" size={64} color={isBookmarked ? '#FFD700' : '#808080'} />
      </button>
      <div className="absolute bottom-[36px] left-[42px] flex h-[90px] w-[204px] flex-col justify-end text-left text-white">
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
