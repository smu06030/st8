'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStampActive } from '@/apis/fetchStampList';

interface StampDetailPropsType {
  id: string;
  region: string;
  created_at: string;
}

const StampItemDetail = () => {
  const params = useParams();
  const region = decodeURIComponent(params.id);
  const [stampData, setStampData] = useState<StampDetailPropsType | null>(null);
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
  console.log('params', params);
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const res = await fetchStampActive(userId);
          const decodedParams = region;
          const res2 = res?.filter((item) => item.region === decodedParams);
          setStampData(res2);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [params.id, userId]);
  console.log('stampData', stampData);
  if (!stampData) return <div>로딩 중...</div>;

  // 가장 오래된 날짜 구하기
  const oldestDate =
    //list.created_at 이게 없다고 나옴 -> 이유는 스트링이라 비교불가 TypeError: list.created_at.reduce is not a function
    stampData.reduce((oldest, current) => {
      const oldestDate = new Date(oldest.created_at); //가장오래된날짜 담을거
      const currentDate = new Date(current.created_at); //비교대상날짜
      return currentDate < oldestDate ? current : oldest;
    });

  console.log('oldestDate', oldestDate);

  return (
    <div>
      <h2>지역</h2>
      <p>{region}</p>
      <h2>갯수</h2>
      <p>{stampData.length}</p>
      <h2>처음찍은 일시</h2>
      <p>{new Date(oldestDate.created_at).toLocaleDateString()}</p>
      <h2>장소</h2>
      {stampData.map((list) => (
        <div key={list.id}>
          <div>{list.address}</div>
          <div>{new Date(list.created_at).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
};

export default StampItemDetail;

/**
 as 타입 : 타입단언(특정타입임을 명시적으로 알려줌->확신하기애매할때)
 */
