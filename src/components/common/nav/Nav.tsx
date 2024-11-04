'use client';

import React, { useState } from 'react';
import Icon from '@/components/common/Icons/Icon';
import Link from 'next/link';

const Nav = () => {
  const [activePage, setActivePage] = useState('/');

  const handleClick = (link: string) => {
    setActivePage(link);
  };

  const navCategory = [
    {
      page: '홈',
      link: '/',
      icon: (() => {
        let color = '#B5B5B5';
        if (activePage === '/') {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="HomeIcon" size={28} color={color} bgColor="transparent" />);
      })()
    },
    {
      page: '앨범',
      link: '/photo-album',
      icon: (() => {
        let color = '#B5B5B5';
        if (activePage === '/photo-album') {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="AlbumIcon" size={28} color={color} bgColor="transparent" />);
      })()
    },
    {
      page: '스탬프',
      link: '/stamp-all',
      icon: (() => {
        let bgColor = '#B5B5B5';
        let color = '#fff';
        if (activePage === '/stamp-all') {
          bgColor = '#00688A';
          color = '#fff';
        }
        return React.cloneElement(<Icon name="StampIcon" size={28} bgColor={bgColor} rx="16" />, {
          color: color, // 명시적으로 color prop 전달
          style: { color: color }
        });
      })()
    },
    {
      page: '추천 여행지',
      link: '/tourism',
      icon: (() => {
        let color = '#B5B5B5';
        if (activePage === '/tourism') {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="AlbumIcon" size={28} color={color} bgColor="transparent" />);
      })()
    },
    {
      page: '마이페이지',
      link: '/mypage',
      icon: (() => {
        let color = '#B5B5B5';
        if (activePage === '/mypage') {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="UserIcon" size={28} color={color} bgColor="transparent" />);
      })()
    }
  ];
  console.log('activePage', activePage);
  return (
    <div className="border-top fixed bottom-0 left-0 z-10 w-full border-t border-[#B5B5B5] bg-white">
      <ul className="grid grid-cols-5">
        {navCategory.map((navItem) => (
          <li
            key={navItem.page}
            className="cursor-pointer py-[8px] text-center"
            onClick={() => handleClick(navItem.link)}
          >
            <Link
              href={navItem.link}
              className={`flex flex-col items-center ${activePage === navItem.link ? 'text-[#00688A]' : 'text-gray-300'}`}
            >
              {navItem.icon}
              <span className="mt-[2px] font-semiBold text-[12px]">{navItem.page}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
