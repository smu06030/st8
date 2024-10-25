'use client';

import { useEffect, useMemo, useState } from 'react';
import { pathListFormatter } from '@/utils/region/pathListFormatter';
import { GeoData } from '@/types/kakaomap/CoordRegionCode.type';

const useGeoData = () => {
  const [geoList, setGeoList] = useState<GeoData[]>([]);

  // geoList 메모이제이션
  const memoizedGeoList = useMemo(() => geoList, [geoList]);

  useEffect(() => {
    const data = pathListFormatter();
    setGeoList(data);
  }, []);

  return { geoList: memoizedGeoList, setGeoList };
};

export default useGeoData;
