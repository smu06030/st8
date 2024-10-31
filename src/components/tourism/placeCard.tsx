'use client';

import React from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';

interface PlaceCardProps {
  imageUrl: string;
  description: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ imageUrl, description }) => {
  return (
    <div className="shadow-md relative min-w-[300px] max-w-xs flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
      <button className="shadow-md absolute left-2 top-2 z-10 rounded-full bg-white p-2">
        <FaBookmark size={16} className="text-gray-600" />
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
