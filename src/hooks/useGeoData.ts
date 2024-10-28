import { useEffect, useMemo, useState } from 'react';
import { pathListFormatter } from '@/utils/region/pathListFormatter';
import { GeoData } from '@/types/kakaomap/CoordRegionCode.type';
import { siDoFormatter } from '@/utils/region/siDoFormatter';

const useGeoData = () => {
  const [geoList, setGeoList] = useState<GeoData[]>([]);

  // geoList 메모이제이션
  const memoizedGeoList = useMemo(() => geoList, [geoList]);
  // geoList 이름 필터링
  const siDoName = useMemo(() => siDoFormatter(geoList), [geoList]);

  useEffect(() => {
    const data = pathListFormatter();
    setGeoList(data);
  }, []);

  return { geoList: memoizedGeoList, siDoName, setGeoList };
};

export default useGeoData;
