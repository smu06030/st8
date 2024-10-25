'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStamp } from '@/server/fetchStampList';

interface StampDetailPropsType {
  id: string;
  region: string;
  created_at: string;
}

const StampItemDetail = () => {
  const params = useParams();
  const [stampData, setStampData] = useState<StampDetailPropsType | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user) return;
      else setUserId(user);
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchStamp(userId, params.id as string, setStampData);
    }
  }, [params.id, userId]);

  if (!stampData) return <div>로딩 중...</div>;

  return (
    <div>
      <div>{stampData.id}</div>
      <div>{stampData.region}</div>
      <div>{stampData.created_at}</div>
    </div>
  );
};

export default StampItemDetail;

/**
 as 타입 : 타입단언(특정타입임을 명시적으로 알려줌->확신하기애매할때)
 */
