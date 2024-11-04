'use client'; // 클라이언트 전용으로 설정

import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import { handleBookmarkClick } from './bookMark';
import { useRouter } from 'next/navigation';

interface PlaceCardProps {
  imageUrl: string;
  description: string;
  userId?: string;
  contentid: string;
  title: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ imageUrl, description, userId, contentid, title }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter(); // useRouter를 클라이언트 컴포넌트에서 호출

  const onCardClick = () => {
    if (contentid) {
      router.push(`/tourism-detail/${contentid}`);
    }
  };

  const onBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsBookmarked(!isBookmarked);
    handleBookmarkClick(contentid, title, description);
  };

  return (
    <div
      onClick={onCardClick}
      className="relative h-[374px] w-[327px] cursor-pointer overflow-hidden rounded-[24px] bg-gray-800"
    >
      <div className="absolute inset-0">
        <Image src={imageUrl} alt={description || '이미지 설명 없음'} fill className="rounded-[24px] object-cover" />
      </div>
      <button
        onClick={onBookmarkClick}
        className={`absolute right-4 top-4 z-20 ${isBookmarked ? 'text-yellow-500' : 'text-gray-500'}`}
      >
        <Icon name="BookMarkIcon" size={64} color={isBookmarked ? '#FFD700' : '#808080'} />
      </button>
      <div className="absolute bottom-[36px] left-[42px] h-[30px] w-[204px] text-left text-white">
        <h3 className="text-xl font-semibold">{description}</h3>
      </div>
    </div>
  );
};

export default PlaceCard;
