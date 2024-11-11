'use client';

import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Image from 'next/image';
import Icon from '../common/Icons/Icon';
import useUserId from '@/hooks/useUserId';
import { useBookmarkMutation } from '@/queries/mutation/useBookmarkMutation';
import { useRouter } from 'next/navigation';

interface TourismDetailPropsType {
  tourismDetail: any;
  contentId: string;
}

const TourismDetail = ({ tourismDetail, contentId }: TourismDetailPropsType) => {
  const userId = useUserId();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(tourismDetail.isBookmarked);
  console.log(isBookmarked);
  const { mutate: bookmarkMutate } = useBookmarkMutation();

  // 북마크 클릭 이벤트
  const onClickBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!userId) {
      alert('로그인이 필요한 서비스 입니다.');
      router.push('/login');
      return;
    }
    const title = tourismDetail.title;
    const description = tourismDetail.text;

    // 좋아요 업데이트
    bookmarkMutate({ contentId, userId, isBookmarked, title, description });
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen px-6">
      <div className="relative">
        <div className="relative h-[375px] w-[full] overflow-hidden rounded-bl-3xl rounded-br-3xl">
          <Image src={tourismDetail?.firstImage} alt="장소 사진" fill priority style={{ objectFit: 'cover' }} />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <button
          onClick={onClickBookmark}
          className="absolute bottom-4 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black bg-opacity-50"
        >
          <Icon name="BookMarkIcon2" size={54} color={isBookmarked ? '#FFD700' : '#FFFFFF'} />
        </button>
      </div>
      <div className="flex items-center space-x-2 border-b border-gray-400 py-6 text-left">
        <h1 className="w-[193px] text-2xl font-semibold text-black">{tourismDetail?.text}</h1>
      </div>
      {(tourismDetail?.openDate ||
        tourismDetail?.parking ||
        tourismDetail?.restDate ||
        tourismDetail?.creditCard ||
        tourismDetail?.babyCarriage) && (
        <div className="space-y-3 py-6">
          {tourismDetail?.openDate && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="TimeIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">{tourismDetail.openDate}</span>
            </p>
          )}
          {tourismDetail?.parking && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="ParkingIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">주차 {tourismDetail.parking}</span>
            </p>
          )}
          {tourismDetail?.restDate && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="DayOffIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">{tourismDetail.restDate}</span>
            </p>
          )}
          {tourismDetail?.creditCard && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="CreditCardIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">신용카드 {tourismDetail.creditCard}</span>
            </p>
          )}
          {tourismDetail?.babyCarriage && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="StrollerIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">유모차 대여{tourismDetail.babyCarriage}</span>
            </p>
          )}
        </div>
      )}
      <div className="border-b border-gray-300"></div>
      <div className="py-6">
        <p className="text-sm text-gray-700">{tourismDetail?.overview}</p>
      </div>
      <div className="border-b border-gray-300"></div>
      <div className="mb-14 py-6">
        <h2 className="text-2xl font-semibold text-gray-800">이곳이 위치예요</h2>
        {tourismDetail?.address && <p className="mt-2 text-sm text-gray-600">{tourismDetail.address}</p>}
        <Map
          center={{ lat: tourismDetail?.mapY, lng: tourismDetail?.mapX }}
          className="relative mt-4 h-[327px] w-full rounded-3xl bg-gray-300"
          level={3}
        >
          <MapMarker position={{ lat: tourismDetail?.mapY, lng: tourismDetail?.mapX }} />
        </Map>
      </div>
    </div>
  );
};

export default TourismDetail;
