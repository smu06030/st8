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
}

const PlaceCard: React.FC<PlaceCardProps> = ({ firstimage, description, contentid, title }) => {
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
      // Supabase에서 북마크 존재 여부를 확인
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
        setIsBookmarked((prev) => !prev); // 상태를 토글
      }
    } catch (error) {
      console.error('북마크 처리 중 오류가 발생했습니다:', error);
      alert('북마크 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="relative h-[374px] w-[327px] min-w-[327px] cursor-pointer overflow-hidden rounded-[24px] bg-gray-800">
      <Link href={`/tourism-detail/${contentid}`} passHref>
        <div className="absolute inset-0">
          <Image
            src={firstimage ? firstimage : '/placeholder.png'} // firstimage가 null이거나 빈 값일 경우 대체 이미지 사용
            alt={description || '이미지 설명 없음'} // description이 없을 경우 기본 텍스트
            layout="fill" // 이미지를 컨테이너 크기에 맞게 조정
            objectFit="cover" // 이미지가 잘리더라도 컨테이너에 맞추기
            className="rounded-[24px]"
          />
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
