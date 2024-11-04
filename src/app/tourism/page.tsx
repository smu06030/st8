'use client';

import { QUERY_KEY } from '@/queries/query.keys';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingBounce from '../../components/common/Loading/Loading';
import { fetchPlaces, Place } from '../../serverActions/fetchPlacesAction';
import PlaceCard from '../../components/tourism/placeCard';

interface RecommendedPlacesProps {
  groupedPlaces: Record<string, Place[]>;
}

const RecommendedPlaces = () => {
  const { data: groupedPlaces = {}, isPending } = useQuery({
    queryKey: QUERY_KEY.PLACES,
    queryFn: () => fetchPlaces()
  });

  if (isPending) {
    return <LoadingBounce />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1
          className="font-custom text-[32px] font-semibold leading-tight text-secondary-900"
          style={{ color: 'rgb(0, 66, 87)' }}
        >
          <span className="sm:inline block">모아가 엄선한</span>
          <span className="sm:inline block">추천 국내 여행지</span>
        </h1>
      </header>
      <div style={{ height: '48px' }}></div>
      <main>
        {Object.entries(groupedPlaces).map(([city, places]) => (
          <section key={city} className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-custom text-[24px] font-semibold" style={{ color: 'rgb(28, 28, 28)' }}>
                가깝게 떠나는 수도권 여행
              </h2>
            </div>
            <p className="font-custom text-[14px]" style={{ color: 'rgb(105, 105, 105)' }}>
              경기, 인천, 서울 여행지 모음
            </p>
            <div style={{ height: '16px' }}></div>
            <div className="flex space-x-[10px] overflow-x-auto pb-4">
              {places.map((place, index) => (
                <PlaceCard
                  key={index}
                  contentid={place.contentid || '등록되지않는 여행지'}
                  title={place.title || '등록되지않는 여행지'}
                  imageUrl={place.firstimage ? place.firstimage : '/placeholder.png'}
                  description={place.supabaseText || '여행지 정보 없음'}
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
