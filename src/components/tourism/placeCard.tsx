import React from 'react';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import { handleBookmarkClick } from './bookMark';

interface PlaceCardProps {
  imageUrl: string;
  description: string;
  userId?: string;
  contentid: string;
  title: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ imageUrl, description, userId, contentid, title }) => {
  const onBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleBookmarkClick(contentid, title, description);
  };

  // const onCardClick = () => {
  //   if (typeof window !== 'undefined' && contentId) {
  //     window.location.href = `/tourism-detail/${contentId}`;
  //   }
  // };

  return (
    <div
      className="shadow-md relative min-w-[300px] max-w-xs flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200"
      // onClick={onCardClick}
    >
      <button onClick={onBookmarkClick} className="shadow-md absolute left-2 top-2 z-10 rounded-full bg-white p-2">
        <Icon name="BookMarkIcon" />
      </button>

      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={description || '이미지 설명 없음'}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-60 p-2 text-white">
          <h3 className="text-sm font-semibold">{description}</h3>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
