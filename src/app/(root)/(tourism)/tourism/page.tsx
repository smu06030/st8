'use client';

import { QUERY_KEY } from '@/queries/query.keys';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPlaceList } from '@/serverActions/placeActions';
import TouristSwiper from '@/components/mainPage/TouristSwiper';
import { groupPlacesByCity } from '@/utils/place/placeGroupFormatter';
import useUser from '@/hooks/useUser';

const RecommendedPlaces = () => {
  const userId = useUser();

  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: QUERY_KEY.PLACELIST,
    queryFn: () => getPlaceList(userId)
  });

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
      </div>
    );
  }

  // 그룹화된 데이터를 가져옴
  const groupedPlaces = groupPlacesByCity(data);

  return (
    <div className="min-h-screen p-6">
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
              <h2 className="text-lg font-semibold text-gray-800">{places[0]?.citytitle || '도시 정보 없음'}</h2>
            </div>
            <p className="mb-4 text-sm text-gray-500">{city}</p>

            {/* TouristSwiper로 도시별 여행지 목록을 스와이프 가능하게 표시 */}
            <TouristSwiper places={places} />
          </section>
        ))}
      </main>
    </div>
  );
};

export default RecommendedPlaces;
