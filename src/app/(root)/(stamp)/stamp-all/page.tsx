import React from 'react';
import StampList from '@/components/stamp/StampList';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '스탬프',
  description: '스탬프 페이지 입니다.'
};

const StampAll = () => {
  return (
    <div className="relative overflow-hidden mo-only:px-[24px] mo-only:py-[34px]">
      <div className="lg:mx-auto lg:w-full lg:max-w-[1080px] lg:pb-[192px] lg:pt-[165px]">
        <h3 className="text-left font-semiBold text-[32px] leading-[41.6px] text-[#008EBD] lg:text-center lg:text-[48px] lg:text-gray-900">
          모아와 함께
          <br className="lg:hidden" /> 모아온 스탬프에요.
        </h3>
        <span className="mt-[20px] hidden text-center text-[#696969] lg:block">
          지금까지 모은 스탬프들을 확인할 수 있어요.
        </span>
        <StampList />
      </div>
      <Image
        src={`/images/stamp/stamp-bg.png`}
        alt={''}
        width={300}
        height={300}
        className="absolute bottom-[-100px] right-[-100px] -z-10 w-[365px] lg:fixed lg:bottom-[-50px] lg:right-0 lg:w-[395px]"
      />
    </div>
  );
};

export default StampAll;
