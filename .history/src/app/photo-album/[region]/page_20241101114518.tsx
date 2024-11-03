import React from 'react';
import { useParams } from 'next/navigation';

const RegionDetail = () => {
  const { region } = useParams<{ region: string }>();
  console.log('region', region);
  return <div>page</div>;
};

export default RegionDetail;
