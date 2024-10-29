'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStampActive } from '@/apis/fetchStampList';

interface StampDetailPropsType {
  id: string;
  region: string;
  created_at?: string;
  address: string;
}

const StampItemDetail = () => {
  const params = useParams();
  const region = decodeURIComponent((params.id as string[]).toString());
  const [stampData, setStampData] = useState<StampDetailPropsType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // console.log('userId', userId);
  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user) return;
      else setUserId(user);
    };
    checkUser();
  }, []);
  // console.log('params', params);
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const res = await fetchStampActive(userId);
          const decodedParams = region;
          const stampFilterList = res?.filter((item) => item.region === decodedParams) || [];
          setStampData(stampFilterList);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [params.id, userId]);
  console.log('stampData', stampData);

  // 가장 오래된 날짜 구하기
  const oldestDate = stampData.reduce((oldest, current) => {
    const oldestDate = oldest.created_at ? new Date(oldest.created_at) : new Date();
    const currentDate = current.created_at ? new Date(current.created_at) : new Date();
    return currentDate < oldestDate ? current : oldest;
  }, stampData[0]);

  if (!stampData) return <div>로딩 중...</div>;
  // console.log('oldestDate', oldestDate);
  //TODO :이미지명이랑 키값 동일하게하기
  return (
    <div className="flex flex-col gap-[20px] p-[24px]">
      <Image src={`/images/${region}.png`} alt={region} width={300} height={300} />
      <li className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold">지역</h2>
        <p>{region}</p>
      </li>
      <li className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold">갯수</h2>
        <p>{stampData.length}</p>
      </li>
      <li className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold">처음찍은 일시</h2>
        <p>{oldestDate?.created_at ? new Date(oldestDate.created_at).toLocaleDateString() : 'N/A'}</p>
      </li>
      <li className="flex flex-col">
        <h2 className="text-[20px] font-bold">장소</h2>
        <ul>
          {/* TODO :날짜순서 수정하기 */}
          {stampData.map((list) => (
            <li key={list.id} className="flex items-center justify-between">
              <p>{list.address}</p>
              <span>{list.created_at ? new Date(list.created_at).toLocaleDateString() : 'N/A'}</span>
            </li>
          ))}
        </ul>
      </li>
    </div>
  );
};

export default StampItemDetail;

/**
 ! : null이 아님을 보증
 as 타입 : 타입단언(특정타입임을 명시적으로 알려줌->확신하기애매할때)
 */
