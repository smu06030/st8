'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../common/Buttons/Button';
import CameraIcon from '../common/Icons/LandingIcons/CameraIcon';
import CompassIcon from '../common/Icons/LandingIcons/CompassIcon';
import ArrowIcon from '../common/Icons/LandingIcons/ArrowIcon';

const LandingPage = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-between overflow-hidden">
      {/* 아이콘 영역 */}
      <div className="flex w-full flex-grow items-center justify-center">
        <div className="absolute h-[30%]">
          <CameraIcon />
        </div>
        <div className="absolute h-[50%]">
          <CompassIcon />
        </div>
        <div className="absolute h-[60%]">
          <ArrowIcon />
        </div>
      </div>

      {/* 여행 떠나기 버튼 */}
      <div className="mb-[50px] flex w-full flex-col items-center justify-center px-6">
        <Button text="여행 떠나기" variant="blue" onClick={goToLogin} />
      </div>
    </div>
  );
};

export default LandingPage;
