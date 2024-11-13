'use client';

import TourismSwiper from '@/components/tourism/TourismSwiper';
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

  // 도시별 데이터 그룹화
  const groupedPlaces = tourismList ? groupTourismByCity(tourismList) : [];

  return (
    <div className="mt-12 min-h-screen pt-[36px] lg:mt-0 lg:pt-[74px] mo-only:px-6">
      <header className="pc-inner-width mb-[48px]">
        <h1 className="font-bold text-2xl leading-tight text-secondary-900">
          <span className="sm:inline block text-[32px] leading-[41px]">
            모아가 엄선한
            <br />
            추천 국내 여행지
          </span>
        </h1>
      </header>

      <main className="mb-[93px] flex flex-col gap-[46px]">
        {Object.entries(groupedPlaces).map(([city, tourismList]) => (
          <section key={city}>
            <div className="pc-inner-width mb-[6px] flex items-center justify-between">
              <h2 className="text-[24px] font-semibold text-[#1D1D1D]">
                {tourismList[0]?.citytitle || '도시 정보 없음'}
              </h2>
            </div>
            <p className="pc-inner-width mb-[14px] text-sm text-[#696969]">{city}</p>

            {/* TouristSwiper로 도시별 여행지 목록을 스와이프 가능하게 표시 */}
            <TourismSwiper tourismList={tourismList} userId={userId} />
          </section>
        ))}
      </main>
    </div>
  );
};

export default TourismPage;
