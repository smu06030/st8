import React from 'react';
import { Stamp } from '@/types/supabase/table.type';
import { useMapStore } from '@/providers/mapStoreProvider';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';
import { FORMAT_REGION_NAME_KO } from '@/constants/regions';

interface KakaoMapMarkerPropsType {
  stamp: Stamp;
  openModal: () => void;
}

const KakaoMapMarker = ({ stamp, openModal }: KakaoMapMarkerPropsType) => {
  const map = useMap();
  const setStampInfo = useMapStore((state) => state.setStampInfo);

  return (
    <MapMarker
      key={stamp.id}
      position={{ lat: stamp.lat, lng: stamp.lng }}
      onClick={(marker) => {
        map.panTo(marker.getPosition());
        setStampInfo(stamp);
        openModal();
      }}
      image={{
        src: `/images/marker/${FORMAT_REGION_NAME_KO[stamp.region]}.png`,
        size: {
          width: 24,
          height: 35
        }
      }}
      title={stamp.region}
    ></MapMarker>
  );
};

export default KakaoMapMarker;
