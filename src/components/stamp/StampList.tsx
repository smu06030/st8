'use client';

import { useRouter } from 'next/navigation';
import { DEFAULT_REGION_ITEM } from '@/constants/regions';
import { useGetStampListQuery } from '@/hooks/queries/query/useStampQuery';
import { REGION_NAME_MAP_KO, STAMPIMG_REGION_IMG } from '@/utils/region/RegionNames';

import Image from 'next/image';
import Loading from '@/app/(root)/(stamp)/loading';
import StampItem from '@/components/stamp/StampItem';
import useUserId from '@/hooks/auth/useUserId';

const StampList = () => {
  const userId = useUserId();
  const router = useRouter();
  const { data: stampList = [], isLoading, isPending, isError } = useGetStampListQuery(userId);

  const promptLogin = () => {
    if (!userId) {
      alert('로그인이 필요한 서비스 입니다.');
      router.push('/login');
    }
  };

  if (!userId) {
    const loginRequiredRegions = Object.entries(STAMPIMG_REGION_IMG).map(([region, img]) => ({ region, img })); //비활성화지역이름(로그인안한상태)
    console.log('loginRequiredRegions', loginRequiredRegions);
    return (
      <ul className="grid grid-cols-2 gap-[15px] lg:grid-cols-5 lg:gap-[16px] lg:pt-[64px] mo-only:py-[42px]">
        {loginRequiredRegions.map((stamp) => (
          <li
            key={stamp.region}
            className="flex flex-col items-center justify-center rounded-[24px] bg-[#fff] p-[20px] lg:p-[25px]"
          >
            <Image
              src={stamp.img}
              alt={stamp.region}
              width={300}
              height={300}
              onClick={promptLogin}
              className="opacity-50"
            />
          </li>
        ))}
      </ul>
    );
  }

  if (isLoading || isPending)
    return (
      <div>
        <Loading />
      </div>
    );

  if (isError) {
    const errorMessage = '스탬프 데이터를 가져오는 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }

  const ActiveRegionList = [...new Set(stampList?.map((item) => item.region))]; //갖고있는스탬프 지역이름
  const DeactiveRegionList = DEFAULT_REGION_ITEM.filter((item) => !ActiveRegionList.includes(item)); //비활성화 지역

  return (
    <ul className="grid grid-cols-2 gap-[15px] lg:grid-cols-5 lg:gap-[16px] lg:pt-[64px] mo-only:py-[42px]">
      <>
        {ActiveRegionList?.map((list) => <StampItem key={list} list={list} stampList={stampList} />)}
        {DeactiveRegionList &&
          DeactiveRegionList.map((stamp) => (
            <li
              key={stamp}
              className="flex flex-col items-center justify-center rounded-[24px] bg-[#fff] p-[20px] lg:p-[25px]"
            >
              <Image
                src={`/images/stamp/${REGION_NAME_MAP_KO[stamp]}.png`}
                alt={stamp}
                width={300}
                height={300}
                className="opacity-50"
              />
            </li>
          ))}
      </>
    </ul>
  );
};

export default StampList;
