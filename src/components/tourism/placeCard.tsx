'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import { handleBookmarkClick, isBookmarkExists } from './bookMark';
import Link from 'next/link';
import useUser from '@/hooks/useUser';

interface PlaceCardProps {
  firstimage: string | null;
  description: string;
  contentid: string;
  title: string;
  onRemoveBookmark?: () => void; // 북마크 해제 콜백 함수 추가
}

const PlaceCard: React.FC<PlaceCardProps> = ({ firstimage, description, contentid, title, onRemoveBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = useUser();

  // 북마크 상태를 가져오는 함수
  const fetchBookmarkStatus = async () => {
    if (!userId || !contentid) {
      setIsLoading(false);
      return;
    }

    try {
      const bookmarkExists = await isBookmarkExists(userId, contentid);
      setIsBookmarked(bookmarkExists);
    } catch (error) {
      console.error('북마크 상태를 가져오는 중 오류가 발생했습니다:', error);
      setIsBookmarked(false);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect로 북마크 상태를 한번만 가져오도록 설정
  useEffect(() => {
    if (userId) {
      fetchBookmarkStatus();
    }
  }, [userId, contentid]);

  const onBookmarkClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isBookmarked === null) return;

    try {
      const bookmarkSuccess = await handleBookmarkClick(contentid, title, description);
      if (bookmarkSuccess) {
        setIsBookmarked((prev) => !prev);

        // 북마크 해제가 성공적이고, 상위 컴포넌트에서 콜백이 전달된 경우
        if (isBookmarked && onRemoveBookmark) {
          onRemoveBookmark(); // 상위 컴포넌트에서 해당 항목을 제거하도록 요청
        }
      }
    } catch (error) {
      console.error('북마크 처리 중 오류가 발생했습니다:', error);
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
