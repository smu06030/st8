import { useMap } from 'react-kakao-maps-sdk';
import { useEffect } from 'react';

const KakaoMapMaxLevel = () => {
  const map = useMap();

  useEffect(() => {
    // 최대 확대 수준 설정 (13로 설정)
    if (map) {
      map.setMaxLevel(13);
    }
  }, [map]);

  return null;
};

export default KakaoMapMaxLevel;
