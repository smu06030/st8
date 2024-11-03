'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { fetchUser } from '@/utils/fetchUser';
import { fetchStampActive } from '@/apis/fetchStampList';
import Loading from '@/app/stamp-map/loading';
import Icon from '@/components/common/Icons/Icon';
import useDropdoun from '@/hooks/useDropdoun';

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
  const { isOpen, toggleDropdown, dropdownRef } = useDropdoun();

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

  if (!stampData)
    return (
      <div>
        <Loading />
      </div>
    );

  //TODO :이미지명이랑 키값 동일하게하기
  return (
    <div className="flex h-[100%] flex-col bg-no-repeat">
      <div className="relative block h-[145px] w-full bg-[#fff] shadow-[0px_1px_12px_0px_rgba(0,0,0,0.15)]">
        <span className="absolute left-1/2 top-[16px] block h-[180px] w-[180px] -translate-x-1/2 overflow-hidden rounded-full bg-white shadow-[0px_1px_12px_0px_rgba(0,0,0,0.15)]"></span>
        <div className="absolute h-full w-full bg-[#fff]"></div>
        <span className="absolute left-1/2 top-[16px] block h-[180px] w-[180px] -translate-x-1/2 overflow-hidden rounded-full bg-white">
          <Image src={`/images/${region}.png`} alt={region} width={300} height={300} />
        </span>
      </div>
      <div className="mx-[24px] mt-[31px] rounded-[24px] bg-white px-[28px] pb-[34px] pt-[82px]">
        <h2 className="mb-[24px] font-semiBold text-[20px]">{region} 스탬프</h2>
        <ul className="flex flex-col gap-[14px]">
          <li className="flex items-center justify-start gap-[8px]">
            <Icon name="TimeIcon" size={28} color="white" bgColor="#00688A" rx="16" />
            {/* TODO: 날짜표시 수정*/}
            <p>{oldestDate?.created_at ? new Date(oldestDate.created_at).toLocaleDateString() : 'N/A'}</p>
            <span>{oldestDate?.created_at ? new Date(oldestDate.created_at).getHours() : 'N/A'}시</span>
          </li>
          <li className="flex items-center justify-start gap-[8px]">
            <Icon name="ComPassIcon" size={28} color="white" bgColor="#00688A" rx="16" />
            <p>{stampData[0] ? stampData[0].address : ''}</p>
          </li>
          <li className="flex items-center justify-start gap-[8px]">
            <Icon name="StampIcon" size={28} color="white" bgColor="#00688A" rx="16" />
            <p>{stampData.length}개</p>
          </li>
        </ul>
      </div>

      <li className="mt-[55px] flex flex-col gap-[24px] px-[28px]" ref={dropdownRef}>
        <div className="flex items-center justify-start gap-[10px]" onClick={toggleDropdown}>
          <h2 className="font-semiBold text-[24px]">히스토리</h2>
          <button className={`transform transition-transform duration-500 ${isOpen ? 'rotate-90' : '-rotate-90'}`}>
            <Icon name="ArrowIcon" size={28} />
          </button>
        </div>
        {isOpen && (
          // ${isOpen ? 'animate-dropdownList' : 'animate-dropUpList'}
          <ul className="animate-dropdownList flex flex-col gap-[12px] transition-all duration-300">
            {stampData.map((list) => (
              <li
                key={list.id}
                className="flex items-center justify-between rounded-[24px] bg-white px-[28px] py-[24px]"
              >
                <ul className="flex flex-col gap-[14px]">
                  <li className="flex items-center gap-[8px]">
                    <Icon name="TimeIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                    <span>{list.address}</span>
                    {/* TODO: 주소->장소이름으로 대체 - 클릭시 지도로 이동 (?)*/}
                  </li>
                  <li className="flex items-center gap-[8px]">
                    <Icon name="ComPassIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                    <span>{list.created_at ? new Date(list.created_at).toLocaleDateString() : 'N/A'}</span>
                    <span>{list.created_at ? new Date(list.created_at).getHours() : 'N/A'}시</span>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </li>
    </div>
  );
};

export default StampItemDetail;

/**
 ! : null이 아님을 보증
 as 타입 : 타입단언(특정타입임을 명시적으로 알려줌->확신하기애매할때)
 */
