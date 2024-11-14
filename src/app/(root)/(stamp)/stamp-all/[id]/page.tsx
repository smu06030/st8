'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import useUserId from '@/hooks/useUserId';
import { useGetStampListQuery } from '@/queries/query/useStampQuery';
import Loading from '@/app/(root)/(stamp)/loading';
import Icon from '@/components/common/Icons/Icon';
import { REGION_NAME_MAP_EN } from '@/utils/region/RegionNames';
import { Stamp } from '@/types/supabase/table.type';

const StampItemDetail = () => {
  const userId = useUserId();
  const params = useParams();
  const region = REGION_NAME_MAP_EN[decodeURIComponent((params.id as string[]).toString())];
  const [stampData, setStampData] = useState<Stamp[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data: stampList, isLoading } = useGetStampListQuery(userId);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const res = stampList;
          const stampFilterList = res?.filter((item) => item.region === region) || [];
          console.log('stampFilterList', stampFilterList);
          setStampData(stampFilterList);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [params.id, userId, stampList]);

  // 가장 오래된 날짜 구하기
  const oldestDate = stampData.reduce((oldest, current) => {
    const oldestDate = oldest.created_at ? new Date(oldest.created_at) : new Date();
    const currentDate = current.created_at ? new Date(current.created_at) : new Date();
    return currentDate < oldestDate ? current : oldest;
  }, stampData[0]);

  if (!stampData || isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="lg:bg-white">
      <div className="pc-inner-width mt-14 flex h-[100%] flex-col bg-no-repeat pb-[200px]">
        <h2 className="mb-[102px] hidden font-bold text-[64px] text-secondary-900 lg:block lg:pt-[74px]">
          {region} 스탬프
        </h2>
        <div className="lg:flex lg:gap-[50px]">
          <div className="relative block w-full lg:h-full lg:w-[50%] mo-only:mb-[82px] mo-only:h-[145px] mo-only:bg-[#fff] mo-only:shadow-[0px_1px_12px_0px_rgba(0,0,0,0.15)]">
            <span className="absolute left-1/2 top-[16px] block h-[180px] w-[180px] -translate-x-1/2 overflow-hidden rounded-full bg-white shadow-[0px_1px_12px_0px_rgba(0,0,0,0.15)] lg:hidden mo-only:block"></span>
            <div className="absolute h-full w-full bg-[#fff] lg:hidden"></div>
            <span className="absolute left-1/2 top-[16px] block h-[180px] w-[180px] -translate-x-1/2 overflow-hidden rounded-full bg-white p-[24px] lg:relative lg:h-full lg:max-h-[500px] lg:w-[100%] lg:max-w-[500px] lg:bg-[#F5F5F7] lg:p-[50px] mo-only:border-[6px] mo-only:border-secondary-300">
              <div className="h-full w-full rounded-full bg-white">
                <Image
                  src={`/images/stamp/${params.id}-active.png`}
                  alt={region}
                  width={300}
                  height={300}
                  className="w-[500px]"
                />
              </div>
            </span>
          </div>
          <div className="mx-[24px] mt-[31px] rounded-[24px] bg-white px-[28px] py-[34px] lg:m-0 lg:flex lg:w-[50%] lg:items-center lg:justify-start">
            <h2 className="mb-[24px] font-semiBold text-[20px] lg:hidden">{region} 스탬프</h2>
            <ul className="flex flex-col gap-[14px]">
              <li className="flex items-center justify-start gap-[8px]">
                <Icon name="TimeIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                <p className="text-[#4F4F4F] lg:text-[24px]">
                  {oldestDate?.created_at
                    ? new Date(oldestDate.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'}
                </p>
                <span className="text-[#4F4F4F] lg:text-[24px]">
                  {oldestDate?.created_at ? new Date(oldestDate.created_at).getHours() : 'N/A'}시
                </span>
              </li>
              <li className="flex items-center justify-start gap-[8px]">
                <Icon name="ComPassIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                <p className="ellipsis-multiline flex-1 text-[#4F4F4F] lg:max-w-[35vw] lg:text-[24px]">
                  {stampData[0] ? stampData[0].address : ''}
                </p>
              </li>
              <li className="flex items-center justify-start gap-[8px]">
                <Icon name="StampIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                <p className="text-[#4F4F4F] lg:text-[24px]">{stampData.length}개</p>
              </li>
            </ul>
          </div>
        </div>
        <li
          className="mt-[55px] flex flex-col gap-[24px] px-[28px] lg:mx-auto lg:w-full lg:max-w-[70vw]"
          ref={dropdownRef}
        >
          <div
            className="flex items-center justify-start gap-[10px] border-b border-[#4F4F4F] py-[10px]"
            onClick={toggleDropdown}
          >
            <h2 className="font-semiBold text-[24px]">히스토리</h2>
            <button className={`transform transition-transform duration-500 ${isOpen ? 'rotate-90' : '-rotate-90'}`}>
              <Icon name="ArrowIcon" size={28} />
            </button>
          </div>
          {isOpen && (
            <ul className="flex w-full animate-dropdownList flex-col gap-[12px] transition-all duration-300">
              {stampData.map((list) => (
                <li
                  key={list.id}
                  className="flex w-full items-center justify-between rounded-[24px] bg-white px-[28px] py-[24px] lg:border lg:border-[#4F4F4F]"
                >
                  <ul className="flex w-full flex-col gap-[14px]">
                    <li className="flex items-center gap-[8px]">
                      <Icon name="TimeIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                      <span className="ellipsis-multiline flex-1 text-[#4F4F4F] lg:max-w-[40vw]">
                        {list.aliasLocation !== null ? list.aliasLocation : list.address}
                      </span>
                    </li>
                    <li className="flex items-center gap-[8px]">
                      <Icon name="ComPassIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                      <span className="text-[#4F4F4F]">
                        {list.created_at
                          ? new Date(list.created_at).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'N/A'}
                      </span>
                      <span className="text-[#4F4F4F]">
                        {list.created_at ? new Date(list.created_at).getHours() : 'N/A'}시
                      </span>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </li>
      </div>
    </div>
  );
};

export default StampItemDetail;
