'use client';

import { QUERY_KEY } from '@/queries/query.keys';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchPlaces, Place } from '@/serverActions/fetchPlacesAction';
import PlaceCard from '@/components/tourism/placeCard';

interface RecommendedPlacesProps {
  groupedPlaces: Record<string, Place[]>;
}

const RecommendedPlaces = () => {
  const { data: groupedPlaces = {}, isPending } = useQuery({
    queryKey: QUERY_KEY.PLACES,
    queryFn: () => fetchPlaces()
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold leading-tight text-secondary-900">
          <span className="sm:inline block">모아가 엄선한</span>
          <span className="sm:inline block">추천 국내 여행지</span>
        </h1>
      </header>

      <main>
        {Object.entries(groupedPlaces).map(([city, places]) => (
          <section key={city} className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">{places[0].citytitle}</h2>
            </div>
            <p className="mb-4 text-sm text-gray-500">{city}</p>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {places.map((place, index) => (
                <PlaceCard
                  key={index}
                  contentid={place.contentid || '등록되지않는 여행지'}
                  title={place.title || '등록되지않는 여행지'}
                  imageUrl={place.firstimage ? place.firstimage : '/placeholder.png'}
                  description={place.supabaseText || '여행지 정보 없음'}
                  userId={''}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default RecommendedPlaces;
