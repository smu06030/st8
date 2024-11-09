import React from 'react';
import StampList from '@/components/stamp/StampList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스탬프',
  description: '스탬프 페이지 입니다.'
};

const StampAll = () => {
  return (
    <div className="px-[24px] py-[34px]">
      <div className="lg:mx-auto lg:w-full lg:max-w-[1080px]">
        <h3 className="text-left font-semiBold text-[32px] leading-[41.6px] text-[#008EBD] lg:text-center lg:text-[48px] lg:text-gray-900">
          모아와 함께
          <br className="lg:hidden" /> 모아온 스탬프에요.
        </h3>
        <span className="mt-[6px] hidden text-center text-[##696969] lg:block">
          지금까지 모은 스탬프들을 확인할 수 있어요.
        </span>
        <StampList />
      </div>
    </div>
  );
};

export default StampAll;
