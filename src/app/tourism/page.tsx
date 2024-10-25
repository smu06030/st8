'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';

const RecommendedPlaces = () => {
  const OPEN_KEY = 'lMW5PvOuHG6KRmQNgM5LlseHOioS6pACr8Jiqh0PkVrPkBCDKR3ML42p6iKjke62akPXM/YnSu09hrSTcJwIGA==';
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=126508&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
        );

        const json = await response.json();
        setPlaces(json.response.body.items.item);
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 rounded-md bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">추천 여행지</h1>
      </header>

      <main>
        <h2 className="mb-4 text-2xl font-semibold">추천 국내 여행지</h2>
        <div className="space-y-8">
          {places.map((place, index) => (
            <div key={index} className="flex rounded-md bg-white p-2 shadow-md">
              <div className="relative mr-4 h-48 w-48 overflow-hidden rounded-md">
                <button className="absolute left-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white">
                  <FaBookmark size={20} />
                </button>
                <Image
                  src={place.firstimage ? place.firstimage : '/placeholder.png'}
                  alt={place.title}
                  width={192}
                  height={192}
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-50 p-1 text-xs font-bold text-white">
                  {place.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecommendedPlaces;
