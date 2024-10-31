'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';
import browserClient from '../../../utils/supabase/client';

const PlaceDetail = ({ params }) => {
  const { id } = params;

  const [firstImage, setFirstImage] = useState(null);
  const [titleText, setTitleText] = useState('');
  const [overview, setOverview] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const { data, error } = await browserClient.from('tourlist').select('text').eq('contentid', id).single();

        if (error) throw error;

        setTitleText(data.text || '제목을 불러올 수 없습니다');

        const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
        );

        const apiData = await response.json();
        const item = apiData.response.body.items.item[0] || {};

        setFirstImage(item.firstimage || '/placeholder.png');
        setOverview(item.overview || '상세 설명을 불러올 수 없습니다');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 상단 이미지 */}
      <div className="relative h-60 w-full overflow-hidden rounded-b-lg bg-gray-300">
        {!loading && firstImage ? (
          <Image src={firstImage} alt="장소 사진" layout="fill" objectFit="cover" />
        ) : (
          <p>Loading...</p>
        )}
        <button className="shadow-md absolute bottom-2 right-2 z-10 rounded-full bg-white p-2">
          <FaBookmark size={16} className="text-gray-600" />
        </button>
      </div>

      {/* 제목 및 설명 */}
      <div className="mt-4 px-4">
        <h1 className="font-bold text-2xl text-gray-800">{titleText}</h1>
        <p className="mt-2 text-sm text-gray-500">주차 가능 · 18:00 - 21:00 · 주차 가능</p>
      </div>

      {/* 상세 정보 및 더보기 버튼 */}
      <div className="mt-4 px-4">
        <p className="text-sm text-gray-700">{overview}</p>
      </div>

      {/* 위치 섹션 */}
      <div className="mt-8 px-4">
        <h2 className="text-lg font-semibold text-gray-800">위치</h2>
        <p className="mt-1 text-sm text-gray-500">여기에 주소가 들어가요</p>
        <div className="relative mt-4 h-40 w-full rounded-lg bg-gray-300">
          <Image src="/map-placeholder.png" alt="지도" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
