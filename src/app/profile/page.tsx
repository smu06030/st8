import Profile from '@/components/mypage/ProfileInfo';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '프로필 페이지',
  description: '프로필 페이지입니다.'
};

const ProfilePage = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
