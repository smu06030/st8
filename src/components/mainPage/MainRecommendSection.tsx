'use client';

import Link from 'next/link';
import Icon from '../common/Icons/Icon';
import useUserId from '@/hooks/useUserId';
import MainTourismSwiper from './swiper/MainTourismSwiper';
import { useGetTourismListQuery } from '@/queries/query/useTourismQuery';

const MainRecommendSection = () => {
  const userId = useUserId();
  const { data: tourismList, isError } = useGetTourismListQuery(userId);

  if (isError) {
    const errorMessage = '추천 여행지 정보를 가져오는 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }

  return (
    <section className="mb-[100px] mt-[58px] lg:mt-[76px] mo-only:px-6">
      <div className="flex flex-col items-start justify-start gap-1.5 lg:items-center lg:justify-center">
        <Link href={'/tourism'} className="lg:hidden">
          <div className="flex items-center justify-start gap-1">
            <p className="font-semiBold text-2xl leading-[31.20px] text-gray-900">모아가 추천하는 여행지</p>
            <Icon name="ArrowIcon" />
          </div>
        </Link>
        <p className="hidden font-semiBold text-2xl leading-[31.20px] text-gray-900 lg:flex">모아의 추천 여행지</p>
        <p className="text-sm leading-tight text-gray-600 lg:mt-2">모아가 엄선한 국내 여행지를 모았어요.</p>
        <Link href={'/tourism'} className="mo-only:hidden">
          <div className="mt-4 flex items-center justify-center gap-1">
            <p className="-mb-[1px] text-sm leading-tight text-secondary-600">추천 여행지 구경하기</p>
            <Icon name="ArrowIcon" size={14} color="#00b4ef" />
          </div>
        </Link>
      </div>
      {tourismList && tourismList.length > 0 ? (
        <MainTourismSwiper tourismList={tourismList} userId={userId} />
      ) : (
        <p className="text-sm text-alert lg:mt-7 lg:flex lg:items-center lg:justify-center">텅</p>
      )}
    </section>
  );
};

export default MainRecommendSection;
