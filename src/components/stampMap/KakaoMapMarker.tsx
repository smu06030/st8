import React from 'react';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

interface KakaoMapMarkerPropsType {
  address: string;
  createed_at: string;
  id: number;
  lat: number;
  lng: number;
  region: string;
  stampimg: string;
  user_id: string;
  visited: boolean;
}

const KakaoMapMarker = ({ stamp }: { stamp: KakaoMapMarkerPropsType }) => {
  const map = useMap();

  return (
    <MapMarker
      key={stamp.id}
      position={{ lat: stamp.lat, lng: stamp.lng }}
      onClick={(marker) => {
        map.panTo(marker.getPosition());
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
