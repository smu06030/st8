import Link from 'next/link';
import Icon from '../common/Icons/Icon';

const MainRecommendSection = () => {
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
      <div className="relative mt-5 h-[374px] w-[327px]">
        <div className="absolute left-0 top-0 h-[374px] w-[327px] rounded-3xl bg-gray-900/70"></div>
        <div className="absolute left-[36px] top-[302px] h-[30px] w-[204px] text-2xl font-semibold leading-[31.20px] text-white">
          아름다운 부산의 야경
        </div>
        <div className="absolute left-[247px] top-[20px]">
          <Icon name="BookMarkIcon" size={64} />
        </div>
      </div>
    </section>
  );
};

export default MainRecommendSection;
