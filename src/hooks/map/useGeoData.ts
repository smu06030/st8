import { GeoData } from '@/types/stamp/coordRegionCode.type';
import { pathListFormatter } from '@/utils/region/pathListFormatter';
import { geoListSiDoFormatter } from '@/utils/region/siDoFormatter';
import { useEffect, useMemo, useState } from 'react';

const useGeoData = () => {
  const [geoList, setGeoList] = useState<GeoData[]>([]);

  // geoList 메모이제이션
  const memoizedGeoList = useMemo(() => geoList, [geoList]);
  // geoList 이름 필터링
  const siDoName = useMemo(() => geoListSiDoFormatter(geoList), [geoList]);

  useEffect(() => {
    const data = pathListFormatter();
    setGeoList(data);
  }, []);

  return { geoList: memoizedGeoList, siDoName, setGeoList };
};

export default useGeoData;
