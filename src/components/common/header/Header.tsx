'use client';

import React from 'react';
import Icon from '@/components/common/Icons/Icon';
import useHeaderActive from '@/hooks/useHeaderActive';

const Header = () => {
  const { pageTitle, goBack } = useHeaderActive();

  const headerCategory = [
    { page: '홈', link: '/' },
    { page: '지도', link: '/stamp-map' },
    { page: '앨범', link: '/photo-album' },
    { page: '스탬프', link: '/stamp-all' },
    { page: '스탬프 찍기', link: '/stamp-tracking' },
    { page: '추천 여행지', link: '/tourism' },
    { page: '마이페이지', link: '/mypage' },
    { page: '로그인', link: '/login' },
    { page: '회원가입', link: '/signup' },
    { page: '비밀번호 찾기', link: '/forgot-password' }
  ];

  if (!pageTitle) return null;

  return (
    <header className="shadow-headerShadow fixed top-0 z-[100] h-[56px] w-full bg-white">
      <div className="flex items-center justify-between p-[12px]">
        <button onClick={goBack} className="text-gray-900">
          <Icon name="BackIcon" />
        </button>
        <h1 className="text-center text-[18px] font-semibold">{pageTitle}</h1>
        {pageTitle === '앨범' ? (
          <button className="text-gray-900">
            <Icon name="EtcIcon" />
          </button>
        ) : (
          <span className="w-6" /> // 다른 페이지에서는 가운데 정렬을 위한 빈 요소
        )}
      </div>
    </header>
  );
};

export default Header;
// onClick={() => setEdit((prev) => !prev)}
