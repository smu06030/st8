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
        {stampList && stampList.length > 0 ? (
          stampList
            .filter((_, index) => index < 4)
            .map((stamp) => (
              <Link
                href={`/stamp-all/${REGION_NAME_MAP_KO[stamp.region]}`}
                key={stamp.id}
                className="flex h-40 w-full items-center justify-center rounded-3xl bg-[#071325]"
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
