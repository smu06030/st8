'use client';

import { Map, Polygon } from 'react-kakao-maps-sdk';
import useGeoData from '@/hooks/useGeoData';
import { MAP_COLOR } from '@/constants/mapColor';
import { useCallback, useState } from 'react';
import { PathType } from '@/types/kakaomap/CoordRegionCode.type';
import ReSetttingMapBounds from '@/components/stampMap/ReSetttingMapBounds';
import ScrollButtonSwiper from '@/components/stampMap/ScrollButtonSwiper';

const KakaoMap = () => {
  const [location, setLocation] = useState({
    center: { lat: 35.90701, lng: 127.570667 },
    isPanto: true
  });

  // 선택된 경로 상태 추가
  const [selectedPath, setSelectedPath] = useState<PathType>([]);
  // 선택된 슬라이드 index
  const [activeIndex, setActiveIndex] = useState(0);
  // 폴리곤 list
  const { geoList, setGeoList } = useGeoData();

  // 폴리곤 hover 업데이트
  const updateHoverState = useCallback(
    (key: number, isHover: boolean) => {
      setGeoList((prevGeoList) => prevGeoList.map((area) => (area.key === key ? { ...area, isHover } : area)));
    },
    [setGeoList]
  );

  const handlePolygonPath = (path: PathType, index: number) => {
    setActiveIndex(index + 1); // 클릭한 폴리곤 index 저장
    setSelectedPath(path); // 클릭한 폴리곤의 path를 상태에 저장
  };

  return (
    <>
      <Map
        id="map"
        center={location.center}
        isPanto={location.isPanto}
        className="relative h-[100vh] w-[100vw]"
        level={12}
      >
        {activeIndex === 0 ? (
          geoList.map((item, index) => {
            const { key, path, isHover } = item;
            const color = MAP_COLOR[index];

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
                onClick={() => handlePolygonPath(path, index)}
              />
            );
          })
        ) : (
          <Polygon
            key={activeIndex}
            path={selectedPath}
            strokeWeight={2}
            strokeColor={MAP_COLOR[activeIndex - 1]}
            strokeOpacity={0.7}
            strokeStyle="solid"
            fillColor={MAP_COLOR[activeIndex - 1]}
            fillOpacity={0.1}
          />
        )}

        <ReSetttingMapBounds paths={selectedPath} />
      </Map>
      <ScrollButtonSwiper activeIndex={activeIndex} setActiveIndex={setActiveIndex} setSelectedPath={setSelectedPath} />
    </>
  );
};

export default KakaoMap;
