'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useHeaderActive = () => {
  const params = useParams();
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;

    // 동적 페이지도 헤더가 보이도록
    if (currentPath.startsWith('/stamp-all')) {
      setPageTitle('스탬프 페이지');
    } else if (currentPath.startsWith('/photo-album')) {
      setPageTitle('앨범 페이지');
    } else if (currentPath.startsWith('/tourism')) {
      setPageTitle('추천 여행지');
    } else if (currentPath.startsWith('/mypage')) {
      setPageTitle('마이페이지');
    } else if (currentPath.startsWith('/login')) {
      setPageTitle('로그인');
    } else if (currentPath.startsWith('/signup')) {
      setPageTitle('회원가입');
    } else if (currentPath.startsWith('/forgot-password')) {
      setPageTitle('비밀번호 찾기');
    } else if (currentPath === '/') {
      setPageTitle('홈');
    } else if (currentPath.startsWith('/stamp-map')) {
      setPageTitle('지도');
    } else if (currentPath.startsWith('/stamp-tracking')) {
      setPageTitle('스탬프 찍기');
    } else {
      setPageTitle(''); // 정의되지 않은 페이지는 빈 제목
    }
  }, [params]);

  const goBack = () => {
    router.back();
  };

  return {
    pageTitle,
    goBack
  };
};

export default useHeaderActive;
