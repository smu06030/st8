'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';
import browserClient from '../../utils/supabase/client';

const RecommendedPlaces = () => {
  const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
  const [groupedPlaces, setGroupedPlaces] = useState({});

  useEffect(() => {
    const fetchPlacesFromSupabase = async () => {
      try {
        const { data: supabaseData, error } = await browserClient.from('tourlist').select('contentid, text, city');

        if (error) {
          console.error('Supabase 데이터 요청 실패:', error);
          return;
        }

        const contentIds = supabaseData.map((item) => item.contentid);

        const allPlaces = await Promise.all(
          contentIds.map(async (contentid) => {
            const response = await fetch(
              `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
            );
            const json = await response.json();

            const placeData = supabaseData.find((item) => item.contentid === contentid);
            return {
              firstimage: json.response.body.items.item[0]?.firstimage,
              city: placeData?.city,
              supabaseText: placeData?.text
            };
          })
        );

        const groupedByCity = allPlaces.reduce((acc, place) => {
          const city = place.city || '기타';
          if (!acc[city]) acc[city] = [];
          acc[city].push(place);
          return acc;
        }, {});

        setGroupedPlaces(groupedByCity);
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    fetchPlacesFromSupabase();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 rounded-md bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">국내 추천 여행지</h1>
      </header>

      <main>
        {Object.entries(groupedPlaces).map(([city, places]) => (
          <div key={city} className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">{city}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {places.map((place, index) => (
                <div key={index} className="sm:w-48 w-36 flex-shrink-0 rounded-md bg-white p-2 shadow-md">
                  <div className="sm:h-48 sm:w-48 relative h-36 w-36 overflow-hidden rounded-md">
                    <button className="absolute left-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white">
                      <FaBookmark size={20} />
                    </button>
                    <Image
                      src={place.firstimage ? place.firstimage : '/placeholder.png'}
                      alt={place.supabaseText || '이미지 설명 없음'}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                    <div className="absolute bottom-2 right-2 rounded bg-opacity-50 p-1 text-xs font-bold text-white">
                      {place.supabaseText}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default RecommendedPlaces;
