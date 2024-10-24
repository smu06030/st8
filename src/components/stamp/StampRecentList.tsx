'use client';

import React from 'react';
import StampItem from '@/components/stamp/StampItem';
import { useQuery } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
const userId = '61ee6ebf-ec4f-4f81-9115-be57f6d3a97e'; //임시 로그인유저

//로그인유저의 스템프 항목 전부 가져오기
const fetchStampList = async () => {
  const { data, error } = await browserClient.from('stamp').select('*').eq('userid', userId).eq('visited', true);
  if (error) console.error('가져오기 오류:', error.message);
  return data;
};

const StampRecentList = () => {
  const {
    data: stampList,
    isLoading,
    error
  } = useQuery({
    queryKey: ['stamp'], //고유키
    queryFn: fetchStampList
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  // 1달 전
  const oneMonthAgo = new Date(); //현재 날짜의 월
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); //현재 월 - 1 = 한 달 전

  const stampRecentListFilter = stampList?.filter((list) => {
    const createdAt = new Date(list.created_at);
    return createdAt >= oneMonthAgo; //한달전보다 크거나 같은날짜
  });

  return (
    <ul className="grid grid-cols-2 gap-4">
      {stampRecentListFilter?.map((stamp) => <StampItem key={stamp.id} stamp={stamp} />)}
    </ul>
  );
};

export default StampRecentList;
