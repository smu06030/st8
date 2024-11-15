'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PAGE_NAMES } from '@/constants/pageName';

const useHeaderActive = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (pathname === '/not-found') {
      setPageTitle(PAGE_NAMES.NOT_FOUND.page);
    } else if (pathname === '/error') {
      setPageTitle(PAGE_NAMES.ERROR.page);
    } else {
      switch (true) {
        case pathname.startsWith(PAGE_NAMES.STAMP.link):
          setPageTitle(PAGE_NAMES.STAMP.page);
          break;
        case pathname.startsWith(PAGE_NAMES.ALBUM.link):
          setPageTitle(PAGE_NAMES.ALBUM.page);
          break;
        case pathname.startsWith(PAGE_NAMES.TOURISM.link):
          setPageTitle(PAGE_NAMES.TOURISM.page);
          break;
        case pathname.startsWith(PAGE_NAMES.MYPAGE.link):
          setPageTitle(PAGE_NAMES.MYPAGE.page);
          break;
        case pathname.startsWith(PAGE_NAMES.LOGIN.link):
          setPageTitle(PAGE_NAMES.LOGIN.page);
          break;
        case pathname.startsWith(PAGE_NAMES.SIGNUP.link):
          setPageTitle(PAGE_NAMES.SIGNUP.page);
          break;
        case pathname.startsWith(PAGE_NAMES.RESET_PASSWORD.link):
          setPageTitle(PAGE_NAMES.RESET_PASSWORD.page);
          break;
        case pathname === PAGE_NAMES.HOME.link:
          setPageTitle(PAGE_NAMES.HOME.page);
          break;
        case pathname.startsWith(PAGE_NAMES.MAP.link):
          setPageTitle(PAGE_NAMES.MAP.page);
          break;
        case pathname.startsWith(PAGE_NAMES.STAMP_TRACKING.link):
          setPageTitle(PAGE_NAMES.STAMP_TRACKING.page);
          break;
        case pathname.startsWith(PAGE_NAMES.BOOKMARK.link):
          setPageTitle(PAGE_NAMES.BOOKMARK.page);
          break;
        case pathname.startsWith(PAGE_NAMES.UPDATE_PASSWORD.link):
          setPageTitle(PAGE_NAMES.UPDATE_PASSWORD.page);
          break;
        case pathname.startsWith(PAGE_NAMES.UPDATE_SUCCESS.link):
          setPageTitle(PAGE_NAMES.UPDATE_SUCCESS.page);
          break;
        default:
          setPageTitle(PAGE_NAMES.LANDING.page); // 기본값으로 "모아" 설정
      }
    }
  }, [pathname, params]);

  const goBack = () => {
    router.back();
  };

  return {
    pageTitle,
    goBack
  };
};

export default useHeaderActive;
