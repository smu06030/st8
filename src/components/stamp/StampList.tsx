'use client';

import React, { useEffect, useState } from 'react';
import StampItem from '@/components/stamp/StampItem';
// import { useQuery } from '@tanstack/react-query';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { DEFAULT_REGION_ITEM } from '@/constants/regions';
import useQuerys from '@/queries/useQuerys';
import Loading from '@/app/(root)/(stamp)/loading';
import { STAMPIMG_REGION_IMG } from '@/components/stamp/RegionNames';

const StampList: React.FC = (): React.JSX.Element => {
  const userId = useUser();
  const { data: stampList, isLoading } = useQuerys.useGetStampActive(userId);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  // if (!stampList) return <div>데이터가 없습니다.</div>;
  // console.log('STAMPIMG_REGION_IMG', STAMPIMG_REGION_IMG);
  const DeactiveRegionList = Object.entries(STAMPIMG_REGION_IMG).map(([region, img]) => ({ region, img }));
  // console.log('DeactiveRegionList', DeactiveRegionList);
  const groupTrueRegion = [...new Set(stampList?.map((item) => item.region))]; //갖고있는스탬프 지역이름
  const stampInActive = DEFAULT_REGION_ITEM.filter((item) => !groupTrueRegion.includes(item)); //비활성화 지역

  return (
    <ul className="grid grid-cols-2 gap-[15px] py-[42px]">
      {userId ? (
        <>
          {groupTrueRegion?.map((list) => <StampItem key={list} list={list} stampList={stampList} />)}
          {stampInActive &&
            stampInActive.map((stamp) => (
              <li key={stamp} className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
                {/* TODO : 스탬프 준비되면 교체 */}
                {/* <Image src={`/images/${stamp}.png`} alt={stamp} width={300} height={300} className="opacity-50" />  */}
                <Image src={`/images/preparing-img.png`} alt={stamp} width={300} height={300} />
                {/* <div className="font-black">{stamp}</div> 비활성지역이름 */}
              </li>
            ))}
        </>
      ) : (
        <>
          {DeactiveRegionList.map((stamp) => (
            <li key={stamp.region} className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
              <Image src={stamp.img} alt={stamp.region} width={300} height={300} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
//로그인안되어있으면 지역 비공개처리된거 나열하고 + 클릭했을때 일단 로그인해라 얼럿
export default StampList;
