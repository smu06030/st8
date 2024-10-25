'use client';

import { PathType } from '@/types/kakaomap/CoordRegionCode.type';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-kakao-maps-sdk';

const ReSetttingMapBounds = ({ paths }: { paths: PathType }) => {
  const map = useMap();
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    paths.forEach((path) => {
      path.forEach((p) => {
        bounds.extend(new kakao.maps.LatLng(p.lat, p.lng));
      });
    });
    return bounds;
  }, [paths]);

  useEffect(() => {
    if (paths.length > 0) map.setBounds(bounds);
  }, [paths]);

  return null;
};

export default ReSetttingMapBounds;
