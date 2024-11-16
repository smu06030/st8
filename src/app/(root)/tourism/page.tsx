'use client';

import React, { useState, useEffect } from 'react';
import { groupTourismByCity } from '@/utils/tourism/tourismGroupFormatter';
import { useGetTourismListQuery } from '@/hooks/queries/query/useTourismQuery';
import { Tourism } from '@/types/tourism/tourism.type';

import Loading from '@/app/(root)/(stamp)/loading';
import useUserId from '@/hooks/auth/useUserId';
import TourismSwiper from '@/components/tourism/TourismSwiper';

const TourismPage = () => {
  const userId = useUserId();
  const { data: tourismList, isLoading } = useGetTourismListQuery(userId);
  const [tourismListData, setTourismListData] = useState<Tourism[]>([]); //로그인했을때 북마크된 투어리스트상태들 담을 state

  useEffect(() => {
    if (userId && tourismList) {
      //유저아이디와 투어리스트가 있으면 tourismListData 상태에 저장
      setTourismListData(tourismList);
    }
  }, [userId, tourismList]); //유저아이디, 쿼리로 불러온 투어리스트가 변경될때마다

  if (isLoading) {
    return <Loading />;
  }
  // 도시별 데이터 그룹화 : 유저아이디 유무에 따라 할당값 다르게
  const groupedPlaces = userId ? groupTourismByCity(tourismListData) : groupTourismByCity(tourismList || []);

  return (
    <div className="mt-12 min-h-screen pt-[36px] lg:mt-[56px] lg:mt-[74px] mo-only:px-6">
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
        {Object.keys(groupedPlaces).length !== 0 ? ( //groupedPlaces객체라 length사용불가, -> 객체의 키 개수를 확인하는걸로 대체
          Object.entries(groupedPlaces).map(([city, tourismList]) => (
            <section key={city}>
              <div className="pc-inner-width mb-[6px] flex items-center justify-between">
                <h2 className="font-semiBold text-[24px] text-[#1D1D1D]">
                  {tourismList[0]?.citytitle || '도시 정보 없음'}
                </h2>
              </div>
              <p className="pc-inner-width mb-[14px] text-sm font-normal text-[#696969]">{city}</p>

              {/* TouristSwiper로 도시별 여행지 목록을 스와이프 가능하게 표시 */}
              <TourismSwiper tourismList={tourismList} userId={userId} />
            </section>
          ))
        ) : (
          <p className="text-sm text-alert lg:mt-7 lg:flex lg:items-center lg:justify-center">텅</p>
        )}
      </main>
    </div>
  );
};

export default TourismPage;
