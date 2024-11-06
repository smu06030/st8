'use client';

import React, { useEffect, useState } from 'react';
import StampItem from '@/components/stamp/StampItem';
import { useQuery } from '@tanstack/react-query';
// import { fetchUser } from '@/utils/fetchUser';
import useUser from '@/hooks/useUser';
import { fetchStampActive } from '@/apis/fetchStampList';
import Image from 'next/image';
import { DEFAULT_REGION_ITEM } from '@/constants/regions';

const StampList: React.FC = (): React.JSX.Element => {
  // const [userId, setUserId] = useState<string | null>(null);
  const userId = useUser();

  const {
    //스탬프 방문한거 전체데이터
    data: stampList,
    isLoading,
    error
  } = useQuery({
    queryKey: ['stamp'],
    queryFn: async () => {
      if (userId) {
        return await fetchStampActive(userId);
      } else {
        return [];
      }
    },
    enabled: !!userId
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>로드실패</div>;
  if (!stampList) return <div>데이터가 없습니다.</div>;

  const groupTrueRegion = [...new Set(stampList?.map((item) => item.region))]; //갖고있는스탬프 지역이름
  const stampInActive = DEFAULT_REGION_ITEM.filter((item) => !groupTrueRegion.includes(item)); //비활성화 지역

  return (
    <ul className="grid grid-cols-2 gap-[15px] py-[42px]">
      {groupTrueRegion?.map((list) => <StampItem key={list} list={list} stampList={stampList} />)}
      {stampInActive &&
        stampInActive.map((stamp) => (
          <li key={stamp} className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
            <Image src={`/images/${stamp}.png`} alt={stamp} width={300} height={300} className="opacity-50" />
            <div className="font-black">{stamp}</div> {/* TODO: 지우기 */}
          </li>
        ))}
    </ul>
  );
};

export default StampList;
