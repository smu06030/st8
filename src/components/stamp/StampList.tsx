'use client';

import React, { useEffect, useState } from 'react';
import StampItem from '@/components/stamp/StampItem';
import { useQuery } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStampActive } from '@/server/fetchStampList';

const StampList = () => {
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
        return null;
      }
    },
    enabled: !!userId // userId가 있을 때만 쿼리 실행
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <ul className="grid grid-cols-2 gap-4">{stampList?.map((stamp) => <StampItem key={stamp.id} stamp={stamp} />)}</ul>
  );
};

export default StampList;
