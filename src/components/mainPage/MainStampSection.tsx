import Link from 'next/link';
import Icon from '../common/Icons/Icon';
import { getStampList } from '@/serverActions/stamp';
import Image from 'next/image';
import { getUser } from '@/serverActions/user';
import { REGION_NAME_MAP_KO, STAMPIMG_REGION_IMG } from '@/utils/region/RegionNames';

const MainStampSection = async () => {
  const user = await getUser();

  let stampList = null;
  if (user) {
    stampList = await getStampList(user.id);
  }

  if (stampList instanceof Response) {
    const error: any = await stampList.json();
    console.log(error);
    throw new Error(error.message);
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
                className="stamp-item relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-[20px] lg:p-[25px]"
              >
                <Image src={stamp.stampimg} width={300} height={300} priority alt={stamp.region} />
              </Link>
            ))
        ) : (
          <>
            {/* 비활성화 상태 */}
            {Object.entries(STAMPIMG_REGION_IMG)
              .map(([region, img]) => ({ region, img }))
              .filter((_, index) => index < 4)
              .map((stamp) => (
                <div
                  key={stamp.region}
                  className="flex flex-col items-center justify-center rounded-[24px] bg-[#fff] p-[20px] lg:p-[25px]"
                >
                  <Image src={stamp.img} alt={stamp.region} width={300} height={300} />
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default MainStampSection;
