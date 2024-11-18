'use client';

import { useMap } from 'react-kakao-maps-sdk';
import { PathType } from '@/types/stamp/coordRegionCode.type';
import { useEffect, useMemo } from 'react';

const ReSetttingMapBounds = ({
  paths,
  activeIndex,
  level
}: {
  paths: PathType;
  activeIndex: number;
  level: number;
}) => {
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
    if (level === 13) {
      if (paths.length > 0) {
        map.setBounds(bounds);
      }
      if (activeIndex === 0) {
        map.setLevel(13);
      }
    }
  }, [paths, level]);

  return null;
};

export default ReSetttingMapBounds;
