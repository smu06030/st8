'use client';

import React from 'react';
import StampItem from '@/components/stamp/StampItem';
import { useQuery } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
const userId = '05a65b78-a87c-49b4-b8e1-e5b80e263e43'; //임시 로그인유저

//로그인유저의 스템프 항목 전부 가져오기
const fetchStampList = async () => {
  const { data, error } = await browserClient.from('stamp').select('*').eq('userid', userId).eq('visited', true);
  if (error) console.error('가져오기 오류:', error.message);
  return data;
};

const StampList = () => {
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

  return (
    <ul className="grid grid-cols-2 gap-4">{stampList?.map((stamp) => <StampItem key={stamp.id} stamp={stamp} />)}</ul>
  );
};

export default StampList;
