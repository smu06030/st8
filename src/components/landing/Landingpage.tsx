'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../common/Buttons/Button';
import CameraIcon from './LandingIcons/CameraIcon';
import CompassIcon from './LandingIcons/CompassIcon';
import ArrowIcon from './LandingIcons/ArrowIcon';

const LandingPage = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="bg-gradient-to-b flex min-h-screen flex-col items-center justify-between from-blue-100 to-white">
      {/* 아이콘 영역 */}
      <div className="relative flex w-full flex-grow items-center justify-center">
        <div className="absolute left-[-10%] top-[50%]">
          <CameraIcon />
        </div>
        <div className="absolute right-[-10%] top-[30%]">
          <CompassIcon />
        </div>
        <div className="absolute left-[10%] top-[30%] rotate-[-15deg] transform">
          <ArrowIcon />
        </div>
      </div>

      {/* 여행 떠나기 버튼 */}
      <div className="mb-10 w-full px-6">
        <Button text="여행 떠나기" variant="blue" onClick={goToLogin} />
      </div>
    </div>
  );
};

export default LandingPage;
