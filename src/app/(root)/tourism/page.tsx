'use client';

import TourlistSwiper from '@/components/mainPage/TourlistSwiper';
import LoadingBounce from '@/components/common/Loading/Loading';
import useUserId from '@/hooks/useUserId';
import { useGetTourismListQuery } from '@/queries/query/useTourismQuery';
import { groupTourismByCity } from '@/utils/tourism/tourismGroupFormatter';

const TourismPage = () => {
  const userId = useUserId();
  const { data: tourismList, isLoading } = useGetTourismListQuery(userId);

  if (isLoading) {
    return <LoadingBounce />;
  }
  console.log(tourismList);

  // 도시별 데이터 그룹화
  const groupedPlaces = tourismList ? groupTourismByCity(tourismList) : [];

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold leading-tight text-secondary-900">
          <span className="sm:inline block">모아가 엄선한</span>
          <span className="sm:inline block">추천 국내 여행지</span>
        </h1>
      </header>

      <main>
        {Object.entries(groupedPlaces).map(([city, tourismList]) => (
          <section key={city} className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">{tourismList[0]?.citytitle || '도시 정보 없음'}</h2>
            </div>
            <p className="mb-4 text-sm text-gray-500">{city}</p>

            {/* TouristSwiper로 도시별 여행지 목록을 스와이프 가능하게 표시 */}
            <TourlistSwiper tourismList={tourismList} userId={userId} />
          </section>
        ))}
      </main>
    </div>
  );
};

export default TourismPage;
