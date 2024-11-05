import AlbumList from '@/components/photoalbum/AlbumList';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '앨범',
  description: '앨범 페이지입니다.'
};

const Album = () => {
  return (
    <div>
      <AlbumList />
    </div>
  );
};

export default Album;
