'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import browserClient from '@/utils/supabase/client';
const userId = '61ee6ebf-ec4f-4f81-9115-be57f6d3a97e'; //임시 로그인유저

interface StampDetailPropsType {
  id: string;
  region: string;
  created_at: string;
}

const StampItemDetail = () => {
  const params = useParams();
  const [stampData, setStampData] = useState<StampDetailPropsType | null>(null);

  //로그인유저의 스템프 항목 전부 가져오기
  const fetchStampList = async () => {
    const { data, error } = await browserClient.from('stamp').select('*').eq('userid', userId).eq('id', params.id);
    if (error) {
      console.error('가져오기 오류:', error.message);
    } else {
      setStampData(data[0]);
    }
    // return data;
  };
  useEffect(() => {
    fetchStampList();
  }, [params.id]);

  if (!stampData) {
    return <div>로딩 중...</div>;
  }

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
 supabase에서 스템프 테이블에서 
 아이디, 지역으로 조인해서 상세 불러오기
 */
