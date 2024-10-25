'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/utils/fetchUser';

import { STAMPIMG_REGION_NAME } from '@/components/stamp/StampImg'; //이미지
import { fetchStampList } from '@/server/fetchStampList'; //로그인유저의 스템프 항목 가져오기
import { AddressPropsType } from '@/types/stamp/AddressPropsType';

interface StampActivePropsType {
  address: AddressPropsType;
}

//뮤테이션 함수 만들기(수파베이스 값 추가)
const addStampList = async ({
  regionName,
  address,
  userId
}: {
  address: string;
  regionName: string;
  userId: string;
}) => {
  const { data, error } = await browserClient.from('stamp').insert({
    user_id: userId,
    region: regionName,
    address: address,
    stampimg: STAMPIMG_REGION_NAME[regionName],
    visited: true
  });
  if (error) console.log('error', error);
  return data;
};

//뮤테이션 함수 만들기(수파베이스 값 삭제)
const deleteStampList = async ({ address, userId }: { address: string; userId: string }) => {
  const { data, error } = await browserClient.from('stamp').delete().eq('address', address).eq('user_id', userId);
  if (error) console.error('삭제중 오류 발생:', error);
  return data;
};

const StampActive = ({ address }: StampActivePropsType) => {
  const queryClient = useQueryClient();
  //   const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user) return;
      else setUserId(user);
    };
    checkUser();
  }, []);

  //useMutation(삭제)
  const StampDeleteMutation = useMutation({
    mutationFn: deleteStampList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowStamp'] });
    }
  });
  //useMutation(추가)
  const StampAddMutation = useMutation({
    mutationFn: addStampList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowStamp'] });
    }
  });

  //mutate 추가이벤트(방문안한 상태에서 누르면)
  const onClickVisitedAdd = (address: string, regionName: string) => {
    if (userId) {
      StampAddMutation.mutate({ address, regionName, userId });
      alert('스탬프가 찍혔습니다.');
    } else {
      console.error('유저아이디가 없습니다.');
      return;
    }
  };
  //mutate 삭제이벤트(방문한 상태에서 누르면)
  const onClickVisitedCencle = (address: string) => {
    if (userId) {
      StampDeleteMutation.mutate({ address, userId });
      alert('스탬프가 취소되었습니다.');
    } else {
      console.error('유저아이디가 없습니다.');
      return;
    }
  };

  //useQuery
  const {
    data: stampList,
    isLoading,
    error
  } = useQuery({
    queryKey: ['nowStamp', address.address_name], //고유키값
    queryFn: () => fetchStampList(address.address_name) // 주소를 인자로 넘김
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  console.log('address', address);
  const REGIONimageUrl = STAMPIMG_REGION_NAME[address.region_1depth_name];

  return (
    <div>
      {stampList && stampList?.length > 0 ? (
        stampList?.map((stamp) => {
          if (stamp.region === address.region_1depth_name) {
            return (
              <Image
                key={stamp.id}
                className="opacity-100"
                src={stamp.stampimg}
                alt={stamp.region}
                width={300}
                height={300}
                onClick={() => onClickVisitedCencle(address.address_name)}
              />
            );
          }
          return null;
        })
      ) : (
        <Image
          className="opacity-30"
          src={REGIONimageUrl}
          alt={address.region_1depth_name}
          width={300}
          height={300}
          onClick={() => onClickVisitedAdd(address.address_name, address.region_1depth_name)}
        />
      )}
    </div>
  );
};

export default StampActive;
