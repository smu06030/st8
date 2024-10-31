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
                  imageUrl={place.firstimage ? place.firstimage : '/placeholder.png'}
                  description={place.supabaseText || '여행지 정보 없음'}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default RecommendedPlaces;
