import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import { handleBookmarkClick } from './bookMark';
// import { useNavigate } from 'react-router-dom';

interface PlaceCardProps {
  imageUrl: string;
  description: string;
  userId?: string;
  contentid: string;
  title: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ imageUrl, description, userId, contentid, title }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const onBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsBookmarked(!isBookmarked);
    handleBookmarkClick(contentid, title, description);
  };

  // const onCardClick = () => {
  //   if (contentid) {
  //     navigate(`/tourism-detail/${contentid}`);
  //   }
  // };

  return (
    <div
      className="relative h-[374px] w-[327px] cursor-pointer overflow-hidden rounded-[24px]"
      style={{ backgroundColor: 'rgba(28, 28, 28, 0.7)' }}
    >
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={description || '이미지 설명 없음'}
          layout="fill"
          objectFit="cover"
          className="rounded-[24px]"
        />
      </div>
      <button onClick={onBookmarkClick} className="absolute right-4 top-4 z-20">
        <Icon name="BookMarkIcon" width={64} height={64} style={{ color: isBookmarked ? '#FFD700' : '#808080' }} />
      </button>
      <div className="absolute bottom-[36px] left-[42px] h-[30px] w-[204px] text-left text-white">
        <h3 className="font-semibold" style={{ fontFamily: 'Pretendard', fontSize: '24px', fontWeight: '600' }}>
          {description}
        </h3>
      </div>
    </div>
  );
};

export default PlaceCard;
