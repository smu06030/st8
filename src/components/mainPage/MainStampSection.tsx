import Link from 'next/link';
import Icon from '../common/Icons/Icon';
import { getStampList } from '@/serverActions/stamp';
import Image from 'next/image';
import { getUser } from '@/serverActions/user';
import { REGION_NAME_MAP_KO } from '@/utils/region/RegionNames';

const MainStampSection = async () => {
  // 커스텀 훅을 사용 안하고 스탬프 정보 가져오기
  const user = await getUser();

  let stampList = null;
  if (user) {
    stampList = await getStampList(user.id);
  }

  return (
    <section className="pc-inner-width mt-8 lg:mt-16 mo-only:px-6">
      <div className="flex flex-col items-start justify-start gap-1.5 lg:items-center lg:justify-center">
        <Link href={'/stamp-all'} className="lg:hidden">
          <div className="flex items-center justify-start gap-1">
            <p className="font-semiBold text-2xl leading-[31.20px] text-gray-900">스탬프</p>
            <Icon name="ArrowIcon" />
          </div>
        </Link>
        <p className="hidden font-semiBold text-2xl leading-[31.20px] text-gray-900 lg:flex">최근에 받은 스탬프들</p>
        <p className="text-sm leading-tight text-gray-600 lg:mt-2">지금까지 모은 스탬프들을 확인 할 수 있어요.</p>
        <Link href={'/stamp-all'} className="mo-only:hidden">
          <div className="mt-4 flex items-center justify-center gap-1">
            <p className="-mb-[1px] text-sm leading-tight text-secondary-600">스탬프 확인하러 가기</p>
            <Icon name="ArrowIcon" size={14} color="#00b4ef" />
          </div>
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-[15px] lg:mt-7 lg:flex lg:justify-center lg:space-x-4">
        {stampList && stampList.length > 0 ? (
          stampList
            .filter((_, index) => index < 4)
            .map((stamp) => (
              <Link
                href={`/stamp-all/${REGION_NAME_MAP_KO[stamp.region]}`}
                key={stamp.id}
                className="flex h-40 w-full items-center justify-center rounded-3xl bg-white lg:h-[200px] lg:w-[200px]"
              >
                <Image src={stamp.stampimg} width={146} height={146} priority alt={stamp.region} />
              </Link>
            ))
        ) : (
          <p className="text-sm text-alert">텅</p>
        )}
      </div>
    </section>
  );
};

export default MainStampSection;
