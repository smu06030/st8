import { useMapStore } from '@/providers/mapStoreProvider';
import { StampType } from '@/types/stampMap/Stamp.types';
import React from 'react';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

const KakaoMapMarker = ({ stamp }: { stamp: StampType }) => {
  const map = useMap();
  const setStampInfo = useMapStore((state) => state.setStampInfo);

  return (
    <MapMarker
      key={stamp.id}
      position={{ lat: stamp.lat, lng: stamp.lng }}
      onClick={(marker) => {
        map.panTo(marker.getPosition());
        setStampInfo(stamp);
        // markerClickHandler(camp)
      }}
      image={{
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
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
