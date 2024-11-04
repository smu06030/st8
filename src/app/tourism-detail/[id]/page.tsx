'use client';

import React from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';
import browserClient from '../../../utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import { handleBookmarkClick } from '../../../components/tourism/bookMark';

interface PlaceDetailProps {
  params: {
    id: string;
  };
}

const fetchPlaceDetail = async (id: string) => {
  const { data, error } = await browserClient.from('tourlist').select('text').eq('contentid', id).single();
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
  const onBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (data) {
      handleBookmarkClick(id, data.text, data.overview);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 상단 이미지 */}
      <div className="relative h-60 w-full overflow-hidden rounded-b-lg bg-gray-300">
        <Image src={data?.firstImage} alt="장소 사진" layout="fill" objectFit="cover" />
        <button
          onClick={onBookmarkClick}
          className="shadow-md absolute bottom-2 right-2 z-10 rounded-full bg-white p-2"
        >
          <FaBookmark size={16} className="text-gray-600" />
        </button>
      </div>

      {/* 제목 및 설명 */}
      <div className="mt-4 px-4">
        <h1 className="font-bold text-2xl text-gray-800">{data?.text}</h1>
      </div>

      {/* 개장일 및 휴무일 정보 */}
      {(data?.openDate || data?.restDate) && (
        <div className="mt-4 px-4">
          <h2 className="text-lg font-semibold text-gray-800">개장일 및 휴무일 정보</h2>
          {data?.openDate && <p className="mt-1 text-sm text-gray-500">개장일: {data.openDate}</p>}
          {data?.restDate && <p className="mt-1 text-sm text-gray-500">휴무일: {data.restDate}</p>}
        </div>
      )}

      {/* 추가 정보 (주차, 유모차 대여, 신용카드 가능 여부) */}
      {(data?.parking || data?.babyCarriage || data?.creditCard) && (
        <div className="mt-4 px-4">
          <h2 className="text-lg font-semibold text-gray-800">추가 정보</h2>
          {data?.parking && <p className="mt-1 text-sm text-gray-500">주차시설: {data.parking}</p>}
          {data?.babyCarriage && <p className="mt-1 text-sm text-gray-500">유모차 대여: {data.babyCarriage}</p>}
          {data?.creditCard && <p className="mt-1 text-sm text-gray-500">신용카드 사용 여부: {data.creditCard}</p>}
        </div>
      )}

      {/* 상세 정보 및 더보기 버튼 */}
      <div className="mt-4 px-4">
        <p className="text-sm text-gray-700">{data?.overview}</p>
      </div>

      {/* 위치 섹션 */}
      <div className="mt-8 px-4">
        <h2 className="text-lg font-semibold text-gray-800">위치</h2>
        <div id="map" className="relative mt-4 h-60 w-full rounded-lg bg-gray-300" />
      </div>
    </div>
  );
};

export default PlaceDetail;
