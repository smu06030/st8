'use client';

import React, { useEffect, useState } from 'react';
import StampItem from '@/components/stamp/StampItem';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStampActive } from '@/apis/fetchStampList';
import { StampData } from '@/types/stamp';

const StampList: React.FC = (): React.JSX.Element => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user) return;
      else setUserId(user);
    };
    checkUser();
  }, []);

  const {
    data: stampList,
    isLoading,
    error
  } = useQuery({
    queryKey: ['stamp'], //고유키
    queryFn: async () => {
      if (userId) {
        return await fetchStampActive(userId);
      } else {
        return [];
      }
    },
    enabled: !!userId // userId가 있을 때만 쿼리 실행
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>로드실패</div>;
  if (!stampList) return <div>데이터가 없습니다.</div>;
  console.log('stampList', stampList);

  const groupRegion = [...new Set(stampList?.map((item) => item.region))];

  return (
    <ul className="grid grid-cols-2 gap-4">
      {groupRegion?.map((list) => <StampItem key={list} list={list} stampList={stampList} />)}
    </ul>
  );
};

export default StampList;

/**
region 기준으로 폴더화하기
   const groupRegion = [...new Set(stampList?.filter((item) => item.region).map((item) => item.region))];
  console.log('regionFolder', groupRegion);
 */
