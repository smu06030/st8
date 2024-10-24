'use client';

import React from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchStampList } from '@/server/fetchStampList'; //로그인유저의 스템프 항목 가져오기
const userId = '05a65b78-a87c-49b4-b8e1-e5b80e263e43'; //임시 로그인유저

const STAMPIMG_REGION_NAME = {
  서울특별시: '/images/서울시.png',
  인천광역시: '/images/인천광역시.png',
  전라북도: '/images/전라북도.png',
  대구광역시: '/images/대구광역시.png',
  부산광역시: '/images/부산광역시.png'
};

//뮤테이션 함수 만들기(수파베이스 값 추가)
const addStampList = async (regionName: string) => {
  const { data, error } = await browserClient.from('stamp').insert({
    user_id: userId,
    region: regionName,
    stampimg: STAMPIMG_REGION_NAME[regionName],
    visited: true
  });
  if (error) console.log('error', error);
  return data;
};

//뮤테이션 함수 만들기(수파베이스 값 삭제)
const deleteStampList = async (regionName: string) => {
  const { data, error } = await browserClient.from('stamp').delete().eq('region', regionName).eq('user_id', userId);
  if (error) console.error('삭제중 오류 발생:', error);
  return data;
};

//스탬프 찍힌거 삭제하려면 어떻게 해야할까?

const StampActive = ({ address }) => {
  const queryClient = useQueryClient();
  const [visited, setVisited] = useState<boolean | null>(null); //방문상태
  const [visitState, setVisitState] = useState<boolean | null>(null); //방문한 항목

  //useMutation(삭제)
  const StampDeleteMutation = useMutation({
    mutationFn: deleteStampList,
    onSuccess: () => {
      queryClient.invalidateQueries(['stamp']);
    }
  });
  //useMutation(추가)
  const StampAddMutation = useMutation({
    mutationFn: addStampList,
    onSuccess: () => {
      queryClient.invalidateQueries(['stamp']);
    }
  });

  //mutate 추가이벤트
  const onClickVisitedAdd = (regionName: string) => {
    //방문안한 상태에서 누르면
    const visitedConfirmed = window.confirm('스탬프를 찍겠습니까?');
    if (visitedConfirmed) {
      StampAddMutation.mutate(regionName);
      setVisited(true); //방문상태 트루로
      console.log('스탬프가 찍혔습니다.');
    } else {
      setVisited(false);
      return;
    }
  };
  //mutate 삭제이벤트
  const onClickVisitedCencle = (regionName: string) => {
    const cancelConfirmed = window.confirm('스탬프를 취소하시겠습니까?');
    if (cancelConfirmed) {
      StampDeleteMutation.mutate(regionName);
      setVisited(false); //방문상태 펄스로
      console.log('스탬프가 취소되었습니다.');
    } else {
      setVisited(true);
      return;
    }
  };

  //useQuery
  const {
    data: stampList,
    isLoading,
    error
  } = useQuery({
    queryKey: ['nowStamp'],
    queryFn: fetchStampList
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  console.log('stampList', stampList);

  const REGIONimageUrl = STAMPIMG_REGION_NAME[address.region_1depth_name];
  return (
    //활성화 비활성화 조건부랜더링하기

    <div>
      {stampList?.length > 0 ? (
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
                onClick={() => onClickVisitedCencle(address.region_1depth_name)}
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
          onClick={() => onClickVisitedAdd(address.region_1depth_name)}
        />
      )}
    </div>
  );
};

export default StampActive;
