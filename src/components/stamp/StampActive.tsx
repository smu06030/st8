'use client';

import React from 'react';
import Image from 'next/image';

const STAMPIMG_REGION_NAME = {
  서울특별시: '/images/서울시.png',
  인천광역시: '/images/인천시.png',
  전라북도: '/images/전라북도.png',
  경상북도: '/images/경상북도.png',
  경상남도: '/images/경상남도.png'
};

// console.log('stamp', stamp);
const StampActive = ({ address }) => {
  //   console.log('address', address);
  const REGIONimageUrl = STAMPIMG_REGION_NAME[address.region_1depth_name];
  return (
    <div>
      <Image
        className="cursor-pointer opacity-30"
        src={REGIONimageUrl}
        alt={address.region_1depth_name}
        width={300}
        height={300}
        // onClick={}
      />
    </div>
  );
};

export default StampActive;
