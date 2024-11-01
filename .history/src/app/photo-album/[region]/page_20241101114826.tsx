'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const RegionDetail = () => {
  const { region } = useParams<{ region: string }>();
  const regionTitle = decodeURIComponent(region);
  console.log('region', regionTitle);
  return <div>page</div>;
};

export default RegionDetail;
