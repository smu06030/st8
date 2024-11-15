'use client';

import { useEffect, useState } from 'react';

const useMediaSize = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px 이상이면 PC 버전
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기값 설정
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
};

export default useMediaSize;
