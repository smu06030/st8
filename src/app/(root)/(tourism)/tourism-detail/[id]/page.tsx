'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import updateBookmarkStatus from '@/components/tourism/updateBookmark';
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
    address: item?.addr1 || '주소를 불러올 수 없습니다',
    openDate: introItem?.opendate || '',
    restDate: introItem?.restdate || '',
    parking: (introItem?.parking || '').replace(/<br>/g, ' '),
    babyCarriage: introItem?.chkbabycarriage || '',
    creditCard: introItem?.chkcreditcard || ''
  };
};

const PlaceDetail: React.FC<PlaceDetailProps> = ({ params }) => {
  const { id } = params;
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY.PLACE_DETAIL(id),
    queryFn: () => fetchPlaceDetail(id),
    enabled: !!id
  });

  const fetchBookmarkStatus = async () => {
    if (!id) {
      setIsLoadingBookmark(false);
      return;
    }

    try {
      const {
        data: { user }
      } = await browserClient.auth.getUser();

      if (!user) {
        console.error('사용자 정보가 없습니다.');
        setIsLoadingBookmark(false);
        return;
      }

      // Replace isBookmarkExists with direct fetching from Supabase
      const { data: bookmarkData, error: bookmarkError } = await browserClient
        .from('bookmark')
        .select('choose')
        .eq('user_id', user.id)
        .eq('contentid', id)
        .single();

      if (bookmarkError) {
        throw new Error(bookmarkError.message);
      }

      setIsBookmarked(bookmarkData?.choose || false);
    } catch (error) {
      console.error('북마크 상태를 가져오는 중 오류가 발생했습니다:', error);
      setIsBookmarked(false);
    } finally {
      setIsLoadingBookmark(false);
    }
  };

  useEffect(() => {
    fetchBookmarkStatus();
  }, [id]);

  useEffect(() => {
    if (data?.mapX && data?.mapY && mapContainer.current) {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
      script.async = true;

      script.onload = () => {
        if (typeof window.kakao !== 'undefined') {
          window.kakao.maps.load(() => {
            if (mapContainer.current) {
              const mapOption = {
                center: new window.kakao.maps.LatLng(data.mapY, data.mapX),
                level: 3
              };

              const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
              const markerPosition = new window.kakao.maps.LatLng(data.mapY, data.mapX);
              const marker = new window.kakao.maps.Marker({ position: markerPosition });
              marker.setMap(map);
            }
          });
        } else {
          console.error('카카오 객체를 찾을 수 없습니다.');
        }
      };

      document.head.appendChild(script);
      return () => {
        if (script) document.head.removeChild(script);
      };
    }
  }, [data?.mapX, data?.mapY]);

  const onBookmarkClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isBookmarked === null) return;

    try {
      const bookmarkSuccess = await updateBookmarkStatus(
        id,
        data?.title || '',
        isBookmarked,
        data?.title || '',
        data?.text || ''
      );
      if (bookmarkSuccess !== undefined) {
        // Check for non-void response
        setIsBookmarked((prev) => !prev);
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.PLACE_DETAIL(id) });
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.PLACES });
      }
    } catch (error) {
      console.error('북마크 처리 중 오류가 발생했습니다:', error);
      alert('북마크 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading || isLoadingBookmark) {
    return <LoadingBounce />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="relative h-[375px] w-[full] overflow-hidden rounded-bl-3xl rounded-br-3xl">
          <Image src={data?.firstImage} alt="장소 사진" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-[#1d1d1d]/70"></div>
        </div>
        <button
          onClick={onBookmarkClick}
          className="absolute bottom-4 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#4e4e4e]/30"
        >
          <Icon name="BookMarkIcon2" size={54} color={isBookmarked ? '#FFD700' : '#FFFFFF'} />
        </button>
      </div>
      <div className="flex items-center space-x-2 border-b border-gray-400 p-6 text-left">
        <h1 className="w-[193px] text-2xl font-semibold text-black">{data?.text}</h1>
      </div>
      {(data?.openDate || data?.parking || data?.restDate || data?.creditCard || data?.babyCarriage) && (
        <div className="mt-4 space-y-3 px-6">
          {data?.openDate && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="TimeIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">{data.openDate}</span>
            </p>
          )}
          {data?.parking && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="ParkingIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">주차 {data.parking}</span>
            </p>
          )}
          {data?.restDate && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="DayOffIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">{data.restDate}</span>
            </p>
          )}
          {data?.creditCard && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="CreditCardIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">신용카드 {data.creditCard}</span>
            </p>
          )}
          {data?.babyCarriage && (
            <p className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
              <Icon name="StrollerIcon" size={32} bgColor="black" color="#FFFFFF" rx="50%" />
              <span className="ml-2">유모차 대여{data.babyCarriage}</span>
            </p>
          )}
        </div>
      )}
      <div className="my-6 border-b border-gray-300"></div>
      <div className="mt-4 px-6">
        <p className="text-sm text-gray-700">{data?.overview}</p>
      </div>
      <div className="my-6 border-b border-gray-300"></div>
      <div className="mb-14 mt-9 px-6">
        <h2 className="text-2xl font-semibold text-gray-800">이곳이 위치예요</h2>
        {data?.address && <p className="mt-2 text-sm text-gray-600">{data.address}</p>}
        <div ref={mapContainer} className="relative mt-4 h-[327px] w-full rounded-3xl bg-gray-300" />
      </div>
      <div className="h-[1738px] w-full"></div>
    </div>
  );
};

export default PlaceDetail;