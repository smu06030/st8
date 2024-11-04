import Link from 'next/link';
import Icon from '../common/Icons/Icon';

const MainStampSection = () => {
  return (
    <section className="mt-8">
      <div className="flex flex-col items-start justify-start gap-1.5">
        <Link href={'/stamp-all'}>
          <div className="flex items-center justify-start gap-1">
            <p className="font-semiBold text-2xl leading-[31.20px] text-gray-900">스탬프</p>
            <Icon name="ArrowIcon" />
          </div>
        </Link>
        <p className="text-sm leading-tight text-gray-600">지금까지 모은 스탬프들을 확인 할 수 있어요.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-[15px]">
        <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
        <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
        <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
        <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
      </div>
    </section>
  );
};

export default MainStampSection;
