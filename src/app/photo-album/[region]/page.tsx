import React from 'react';
import { useParams } from 'next/navigation';

const RegionDetail = () => {
  const { userId } = useParams<{ Rregion: string }>(); //지역값 가져오기

  return <div>RegionDetail</div>;
};

export default RegionDetail;
