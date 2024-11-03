'use client';

import React, { useEffect, useState } from 'react';
import StampItem from '@/components/stamp/StampItem';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStampActive } from '@/apis/fetchStampList';

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
    //스탬프 방문한거 전체데이터
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
  // console.log('stampList', stampList);

  //이거 전역으러빼기
  const defaultRegionItem = [
    '서울',
    '경기',
    '광주',
    '대전',
    '인천',
    '전북특별자치도',
    '강원특별자치도',
    '부산',
    '대구',
    '울산',
    '세종특별자치시',
    '충북',
    '충남',
    '제주특별자치시',
    '경북',
    '전남',
    '경남'
  ];

  return (
    <ul className="grid grid-cols-2 gap-[15px] py-[42px]">
      {defaultRegionItem?.map((list) => <StampItem key={list} list={list} stampList={stampList} />)}
    </ul>
  );
};

export default StampList;

/**
그냥 다 나열하고 있는것만 오파시티할까..
 */
