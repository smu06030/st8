'use client';

import React from 'react';
import Icon from '@/components/common/Icons/Icon';
import useHeaderActive from '@/hooks/useHeaderActive';

const Header = () => {
  const { pageTitle, goBack } = useHeaderActive();

  if (!pageTitle) return null;

  return (
    <header className="fixed top-0 z-[100] h-[56px] w-full bg-white shadow-headerShadow">
      <div className="flex items-center justify-between p-[12px]">
        <button onClick={goBack} className="text-gray-900">
          <Icon name="BackIcon" />
        </button>
        <h1 className="text-center text-[18px] font-semibold">{pageTitle}</h1>
        <span className="w-6" />
      </div>
    </header>
  );
};

export default Header;
