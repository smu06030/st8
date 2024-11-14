'use client';
import React from 'react';
import Icon from '@/components/common/Icons/Icon';
import Link from 'next/link';
import useNavActive from '@/hooks/useNavActive';
import { PAGE_NAMES } from '@/constants/pageName';

const Nav = () => {
  const { activePage, handleClick } = useNavActive();

  const navCategory = [
    {
      page: PAGE_NAMES.HOME.page,
      link: PAGE_NAMES.HOME.link,
      icon: (() => {
        let color = '#B5B5B5';
        if (activePage === PAGE_NAMES.HOME.link) {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="HomeIcon" size={28} color={color} bgColor="transparent" />);
      })()
    },
    {
      page: PAGE_NAMES.ALBUM.page,
      link: PAGE_NAMES.ALBUM.link,
      icon: (() => {
        let color = '#B5B5B5';
        if (/^\/photo-album(\/.*)?$/.test(activePage)) {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="AlbumIcon" size={28} color={color} bgColor="transparent" />);
      })()
    },
    {
      page: PAGE_NAMES.STAMP.page,
      link: PAGE_NAMES.STAMP.link,
      icon: (() => {
        let bgColor = '#B5B5B5';
        let color = '#fff';
        if (/^\/stamp-all(\/.*)?$/.test(activePage) || activePage === PAGE_NAMES.STAMP_TRACKING.link) {
          bgColor = '#00688A';
          color = '#fff';
        }
        return React.cloneElement(<Icon name="StampIcon" size={28} bgColor={bgColor} rx="16" />, {
          color: color,
          style: { color: color }
        });
      })()
    },
    {
      page: PAGE_NAMES.TOURISM.page,
      link: PAGE_NAMES.TOURISM.link,
      icon: (() => {
        let color = '#B5B5B5';
        if (activePage === PAGE_NAMES.TOURISM.link || activePage === '/tourism-detail') {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="MapIcon" size={28} color={color} bgColor="transparent" />);
      })()
    },
    {
      page: PAGE_NAMES.MYPAGE.page,
      link: PAGE_NAMES.MYPAGE.link,
      icon: (() => {
        let color = '#B5B5B5';
        if (activePage === PAGE_NAMES.MYPAGE.link) {
          color = '#00688A';
        }
        return React.cloneElement(<Icon name="UserIcon" size={28} color={color} bgColor="transparent" />);
      })()
    }
  ];

  return (
    <div className="border-top fixed bottom-0 left-0 z-[100] box-border w-full border-t border-[#B5B5B5] bg-white lg:hidden">
      <ul className="grid grid-cols-5">
        {navCategory.map((navItem) => (
          <li key={navItem.page} className="cursor-pointer py-[8px] text-center">
            <Link
              href={navItem.link}
              className={`flex flex-col items-center gap-[2px] ${activePage === navItem.link ? 'text-[#00688A]' : 'text-gray-300'}`}
            >
              {navItem.icon}
              <span className="font-semiBold text-[12px]" onClick={() => handleClick(navItem.link)}>
                {navItem.page}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
