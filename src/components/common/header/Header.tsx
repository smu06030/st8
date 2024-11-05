'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icons/Icon';

interface HeaderProps {
  title: string;
  showRightIcon?: boolean;
  rightIcon?: React.ReactNode;
  badgeCount?: number;
}

const Header: React.FC<HeaderProps> = ({ title, showRightIcon, rightIcon, badgeCount }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <header className="shadow-headerShadow relative flex h-[56px] items-center bg-white p-[10px]">
      {/* 왼쪽 뒤로가기 버튼 */}
      <button onClick={handleBackClick} className="absolute left-4 p-2">
        <Icon name="BackIcon" />
      </button>

      {/* 가운데 타이틀 */}
      <h1 className="mx-auto text-[18px] font-semibold">{title}</h1>

      {/* 우측 아이콘 */}
      {showRightIcon && <div className="absolute right-4 p-2">{rightIcon || <Icon name="EtcIcon" />}</div>}
    </header>
  );
};

export default Header;
