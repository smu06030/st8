'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Map, Polygon } from 'react-kakao-maps-sdk';
import { MAP_COLOR, MAP_COLOR_INDEX } from '@/constants/mapColor';
import ReSetttingMapBounds from '@/components/stampMap/ReSetttingMapBounds';
import MapButtonSwiper from '@/components/stampMap/MapButtonSwiper';
import KakaoMapMarker from './KakaoMapMarker';
import useKakaoMap from '@/hooks/useKakaoMap';
import StampModal from '../common/Modal/StampModal';
import useModal from '@/hooks/useModal';

const KakaoMap = () => {
  const { geoList, location, activeIndex, selectedPath, filteredStamps, updateHoverState, updatePolygonPath } =
    useKakaoMap();
  const { openModal, Modal } = useModal();

  return (
    <>
      <Map
        id="map"
        center={location.center}
        isPanto={location.isPanto}
        className="relative h-[100vh] w-full overflow-hidden"
        level={12}
      >
        {activeIndex === 0 ? (
          geoList.map((item, index) => {
            const { key, path, isHover, name } = item;
            const color = MAP_COLOR[name];

            return (
              <Polygon
                key={key}
                path={path}
                strokeWeight={2} // 선 두께
                strokeColor={color} // 선 색깔
                strokeOpacity={0.7} // 선 불투명도
                strokeStyle={'solid'} // 선 스타일
                fillColor={isHover ? color : '#ffffff'} // 채우기 색깔
                fillOpacity={0.2} // 채우기 불투명도
                onMouseover={() => updateHoverState(key, true)}
                onMouseout={() => updateHoverState(key, false)}
                onClick={() => updatePolygonPath(path, index)}
              />
            );
          })
        ) : (
          <Polygon
            key={activeIndex}
            path={selectedPath}
            strokeWeight={2}
            strokeColor={MAP_COLOR[MAP_COLOR_INDEX[activeIndex - 1]]}
            strokeOpacity={0.7}
            strokeStyle="solid"
            fillColor={MAP_COLOR[MAP_COLOR_INDEX[activeIndex - 1]]}
            fillOpacity={0.1}
          />
        )}

        {filteredStamps?.map((stamp) => <KakaoMapMarker key={stamp.id} stamp={stamp} openModal={openModal} />)}
        <ReSetttingMapBounds paths={selectedPath} activeIndex={activeIndex} />
      </Map>
      <StampModal Modal={Modal} />
      <MapButtonSwiper />
    </>
  );
};

export default KakaoMap;
