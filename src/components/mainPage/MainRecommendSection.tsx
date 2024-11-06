import Link from 'next/link';
import Icon from '../common/Icons/Icon';
import { Place, fetchPlaceData } from '@/serverActions/fetchPlacesAction';

import TouristSwiper from './TouristSwiper';

const MainRecommendSection = async () => {
  const places: Place[] = await fetchPlaceData();

  return (
    <section className="mt-[58px]">
      <div className="flex flex-col items-start justify-start gap-1.5">
        <Link href={'/tourism'}>
          <div className="flex items-center justify-start gap-1">
            <p className="font-semiBold text-2xl leading-[31.20px] text-gray-900">모아가 추천하는 여행지</p>
            <Icon name="ArrowIcon" />
          </div>
        </Link>
        <p className="text-sm leading-tight text-gray-600">모아가 엄선 한 국내 여행지를 모았어요.</p>
      </div>
      <TouristSwiper places={places} />
    </section>
  );
};

export default MainRecommendSection;
