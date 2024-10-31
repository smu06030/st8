'use client';

import React from 'react';
import { fetchPlaces, Place } from '../../components/tourism/fetchApi';
import PlaceCard from '../../components/tourism/placeCard';

interface RecommendedPlacesProps {
  groupedPlaces: Record<string, Place[]>;
}

const RecommendedPlaces = async () => {
  // 비동기로 데이터를 가져오는 부분을 페이지 컴포넌트에서 직접 호출합니다.
  const groupedPlaces = await fetchPlaces();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 rounded-md bg-blue-500 p-4 text-white">
        <h1 className="font-bold text-xl">추천 국내 여행지</h1>
      </header>

      <main>
        {Object.entries(groupedPlaces).map(([city, places]) => (
          <div key={city} className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">{city}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {places.map((place, index) => (
                <PlaceCard
                  key={index}
<<<<<<< HEAD
                  imageUrl={place.firstimage ? place.firstimage : '/placeholder.png'}
                  description={place.supabaseText || '여행지 정보 없음'}
                />
=======
                  className="shadow-md relative min-w-[300px] max-w-xs flex-shrink-0 overflow-hidden rounded-lg bg-gray-200"
                >
                  <button className="shadow-md absolute left-2 top-2 z-10 rounded-full bg-white p-2">
                    <FaBookmark size={16} className="text-gray-600" />
                  </button>

                  <div className="relative h-48 w-full">
                    <Image
                      src={place.firstimage ? place.firstimage : '/placeholder.png'}
                      alt={place.supabaseText || '이미지 설명 없음'}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-60 p-2 text-white">
                      <h3 className="text-sm font-semibold">{place.supabaseText}</h3>
                    </div>
                  </div>
                </div>
>>>>>>> 1f289ffa9c6b133bc1838c3b0e3ee91ab8e6e297
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default RecommendedPlaces;
