'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PAGE_NAMES } from '@/constants/pageName';

const useHeaderActive = () => {
  const params = useParams();
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;

    // 동적 페이지도 헤더가 보이도록
    if (currentPath.startsWith(PAGE_NAMES.STAMP.link)) {
      setPageTitle(PAGE_NAMES.STAMP.page);
    } else if (currentPath.startsWith(PAGE_NAMES.ALBUM.link)) {
      setPageTitle(PAGE_NAMES.ALBUM.page);
    } else if (currentPath.startsWith(PAGE_NAMES.TOURISM.link)) {
      setPageTitle(PAGE_NAMES.TOURISM.page);
    } else if (currentPath.startsWith(PAGE_NAMES.MYPAGE.link)) {
      setPageTitle(PAGE_NAMES.MYPAGE.page);
    } else if (currentPath.startsWith(PAGE_NAMES.LOGIN.link)) {
      setPageTitle(PAGE_NAMES.LOGIN.page);
    } else if (currentPath.startsWith(PAGE_NAMES.SIGNUP.link)) {
      setPageTitle(PAGE_NAMES.SIGNUP.page);
    } else if (currentPath.startsWith(PAGE_NAMES.RESET_PASSWORD.link)) {
      setPageTitle(PAGE_NAMES.RESET_PASSWORD.page);
    } else if (currentPath === PAGE_NAMES.HOME.link) {
      setPageTitle(PAGE_NAMES.HOME.page);
    } else if (currentPath.startsWith(PAGE_NAMES.MAP.link)) {
      setPageTitle(PAGE_NAMES.MAP.page);
    } else if (currentPath.startsWith(PAGE_NAMES.STAMP_TRACKING.link)) {
      setPageTitle(PAGE_NAMES.STAMP_TRACKING.page);
    } else if (currentPath.startsWith(PAGE_NAMES.BOOKMARK.link)) {
      setPageTitle(PAGE_NAMES.BOOKMARK.page);
    } else if (currentPath.startsWith(PAGE_NAMES.UPDATE_PASSWORD.link)) {
      setPageTitle(PAGE_NAMES.UPDATE_PASSWORD.page);
    } else if (currentPath.startsWith(PAGE_NAMES.RESET_PASSWORD.link)) {
      setPageTitle(PAGE_NAMES.RESET_PASSWORD.page);
    } else if (currentPath.startsWith(PAGE_NAMES.UPDATE_SUCCESS.link)) {
      setPageTitle(PAGE_NAMES.UPDATE_SUCCESS.page);
    } else if (currentPath.startsWith(PAGE_NAMES.LANDING.link)) {
      setPageTitle(PAGE_NAMES.LANDING.page);
    } else {
      setPageTitle('');
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
