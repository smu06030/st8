'use client';

import React from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import { handleBookmarkClick } from '@/components/tourism/bookMark';
import LoadingBounce from '@/components/common/Loading/Loading';
import Icon from '@/components/common/Icons/Icon';

interface PlaceDetailProps {
  params: {
    id: string;
  };
}

const fetchPlaceDetail = async (id: string) => {
  const { data, error } = await browserClient.from('tourlist').select('title, text').eq('contentid', id).single();
  if (error) throw new Error(error.message);
  const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
  const response = await fetch(
    `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
  );
  const apiData = await response.json();
  const item = apiData.response?.body?.items?.item?.[0] || {};

  const introResponse = await fetch(
    `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=모아&_type=json&contentId=${id}&contentTypeId=12&serviceKey=${OPEN_KEY}`
  );
  const introData = await introResponse.json();
  const introItem = introData.response?.body?.items?.item?.[0] || {};

  return {
    text: data?.text || '제목을 불러올 수 없습니다',
    title: data?.title || '내용을 불러올 수 없습니다',
    firstImage: item?.firstimage || '/placeholder.png',
    overview: item?.overview || '상세 설명을 불러올 수 없습니다',
    mapX: item?.mapx || null,
    mapY: item?.mapy || null,
    openDate: introItem?.opendate || '',
    restDate: introItem?.restdate || '',
    parking: (introItem?.parking || '').replace(/<br>/g, ' '),
    babyCarriage: introItem?.chkbabycarriage || '',
    creditCard: introItem?.chkcreditcard || ''
  };
};

const PlaceDetail: React.FC<PlaceDetailProps> = ({ params }) => {
  const { id } = params;
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY.PLACE_DETAIL(id),
    queryFn: () => fetchPlaceDetail(id),
    enabled: !!id
  });

  // bookmark
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const onBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (data) {
      handleBookmarkClick(id, data.title, data.text);
      setIsBookmarked(!isBookmarked);
    }
  };

  if (isLoading) {
    return <LoadingBounce />;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 상단 이미지 */}
      <div className="relative">
        <div
          style={{
            width: '100%',
            height: 375,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              opacity: 0.5,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          ></div>
          <Image src={data?.firstImage} alt="장소 사진" layout="fill" objectFit="cover" />
        </div>
        <button
          onClick={onBookmarkClick}
          className="absolute bottom-4 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black bg-opacity-50"
        >
          <Icon name="BookMarkIcon" size={40} color={isBookmarked ? '#FFD700' : '#FFFFFF'} />
        </button>
      </div>

      {/* 제목 및 설명 */}
      <div
        className="flex items-center space-x-2 p-6"
        style={{
          maxWidth: '100%',
          textAlign: 'left',
          position: 'relative',
          borderBottom: '1px solid rgba(156, 156, 156, 1)'
        }}
      >
        <h1
          className="font-semibold text-black"
          style={{
            fontFamily: 'Pretendard',
            fontSize: 24,
            width: 193,
            textAlign: 'left'
          }}
        >
          {data?.text}
        </h1>
      </div>

      {/* 개장일 및 휴무일 정보 */}
      {(data?.openDate || data?.parking || data?.restDate || data?.creditCard || data?.babyCarriage) && (
        <div className="mt-4 px-6">
          {data?.openDate && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="TimeIcon" size={32} bgColor="rgba(0, 0, 0, 1)" color="#FFFFFF" rx="50%" />
              <span className="ml-2 mt-3 text-sm">{data.openDate}</span>
            </p>
          )}
          {data?.parking && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="ParkingIcon" size={32} bgColor="rgba(0, 0, 0, 1)" color="#FFFFFF" rx="50%" />
              <span className="ml-2 mt-3 text-sm">{data.parking}</span>
            </p>
          )}
          {data?.restDate && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="DayOffIcon" size={32} bgColor="rgba(0, 0, 0, 1)" color="#FFFFFF" rx="50%" />
              <span className="ml-2 mt-3 text-sm">{data.restDate}</span>
            </p>
          )}
          {data?.creditCard && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="CreditCardIcon" size={32} bgColor="rgba(0, 0, 0, 1)" color="#FFFFFF" rx="50%" />
              <span className="ml-2 mt-3 text-sm">{data.creditCard}</span>
            </p>
          )}
          {data?.babyCarriage && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="StrollerIcon" size={32} bgColor="rgba(0, 0, 0, 1)" color="#FFFFFF" rx="50%" />
              <span className="ml-2 mt-3 text-sm">{data.babyCarriage}</span>
            </p>
          )}
        </div>
      )}
      <div className="my-6 border-b border-gray-300"></div>
      {/* 상세 정보 및 더보기 버튼 */}
      <div className="mt-4 px-6">
        <p className="text-sm text-gray-700">{data?.overview}</p>
      </div>
      <div className="my-6 border-b border-gray-300"></div>

      {/* 위치 섹션 */}
      <div className="mt-8 px-6">
        <h2 className="text-lg font-semibold text-gray-800">이곳이 위치예요</h2>
        <div id="map" className="relative mt-4 h-60 w-full rounded-lg bg-gray-300" />
      </div>
    </div>
  );
};

export default PlaceDetail;
