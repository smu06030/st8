'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useHeaderActive = () => {
  const params = useParams();
  const router = useRouter();
  const [activePage, setActivePage] = useState('/');
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActivePage(currentPath);

    switch (currentPath) {
      case '/':
        setPageTitle('홈');
        break;

      case '/stamp-map':
        setPageTitle('지도');
        break;

      case '/photo-album':
        setPageTitle('앨범');
        break;
      case '/stamp-all':
        setPageTitle('스탬프');
        break;
      case '/stamp-tracking':
        setPageTitle('스탬프 찍기');
        break;
      case '/tourism':
        setPageTitle('추천 여행지');
        break;
      case '/mypage':
        setPageTitle('마이페이지');
        break;
      case '/login':
        setPageTitle('로그인');
        break;
      case '/signup':
        setPageTitle('회원가입');
        break;
      case '/forgot-password':
        setPageTitle('비밀번호 찾기');
        break;

      default:
        setPageTitle('');
    }
  }, [params]);

  const handleClick = (link: string) => {
    setActivePage(link);
  };

  const goBack = () => {
    router.back();
  };

  return {
    activePage,
    pageTitle,
    setActivePage,
    handleClick,
    goBack
  };
};

export default useHeaderActive;
