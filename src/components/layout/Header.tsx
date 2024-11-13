'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/common/Icons/Icon';
import useHeaderActive from '@/hooks/useHeaderActive';
import MoaLogo from '../common/Icons/MoaLogo';
import { usePathname } from 'next/navigation';
import UserMenu from '../mypage/UserMenu';
import browserClient from '@/utils/supabase/client';

const Header = () => {
  const { pageTitle, goBack } = useHeaderActive();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const { data } = await browserClient.from('profile').select('nickname').eq('id', user.id).single();

        if (data && data.nickname) {
          setNickname(data.nickname);
        } else {
          setNickname(''); // 기본값 또는 닉네임이 없을 때 처리
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);
  if (!pageTitle) return null;

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;
    return isActive ? 'text-gray-900 font-semiBold' : ' hover:font-regular';
  };

  return (
    <>
      {/* 모바일 */}
      <header className="fixed top-0 z-[100] block h-[56px] w-full bg-white shadow-headerShadow lg:hidden">
        <div className="flex items-center justify-between p-[12px]">
          <button onClick={goBack} className="text-gray-900">
            <Icon name="BackIcon" />
          </button>
          <h1 className="text-center font-semiBold text-[18px]">{pageTitle}</h1>
          <span className="w-6" />
        </div>
      </header>

      {/* PC */}
      <header className="fixed top-0 z-[100] hidden h-[56px] w-full bg-white shadow-headerShadow lg:block">
        <div className="mx-12 mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-[12px]">
              <a href="/">
                <MoaLogo />
              </a>
            </div>
          </div>

          <nav className="flex flex-1 justify-center space-x-6 text-sm font-normal text-gray-700">
            <a href="/" className={getLinkStyle('/')}>
              서비스 소개
            </a>
            <a href="/stamp-map" className={getLinkStyle('/stamp-map')}>
              지도
            </a>
            <a href="/tourism" className={getLinkStyle('/tourism')}>
              추천여행지
            </a>
            <a href="/photo-album" className={getLinkStyle('/photo-album')}>
              앨범
            </a>
            <a href="/stamp-all" className={getLinkStyle('/stamp-all')}>
              스탬프
            </a>
          </nav>
          <UserMenu isLoggedIn={isLoggedIn} nickname={nickname} initialNickname={nickname} tempNickname={nickname} />
        </div>
      </header>
    </>
  );
};

export default Header;
