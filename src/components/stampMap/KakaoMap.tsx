'use client';

import { Map, Polygon } from 'react-kakao-maps-sdk';
import useGeoData from '@/hooks/useGeoData';
import { MAP_COLOR } from '@/constants/mapColor';
import { useCallback, useEffect, useState } from 'react';
import { PathType } from '@/types/stampMap/CoordRegionCode.types';
import ReSetttingMapBounds from '@/components/stampMap/ReSetttingMapBounds';
import ScrollButtonSwiper from '@/components/stampMap/ScrollButtonSwiper';
import KakaoMapMarker from './KakaoMapMarker';
import useStamp from '@/hooks/useStamp';
import Loading from '@/app/stamp-map/loading';
import { StampType } from '@/types/stampMap/Stamp.types';
import KakaoMapOverlay from './KakaoMapOverlay';

const KakaoMap = () => {
  const [location, setLocation] = useState({
    center: { lat: 35.90701, lng: 127.570667 },
    isPanto: true
  });

  // 선택된 경로 상태 추가
  const [selectedPath, setSelectedPath] = useState<PathType>([]);
  // 선택된 슬라이드 index
  const [activeIndex, setActiveIndex] = useState(0);
  // 스탬프 리스트 지역 필터링을 위한 상태
  const [filteredStamps, setFilteredStamps] = useState<StampType[] | undefined>([]);
  // 폴리곤 리스트
  const { geoList, siDoName, setGeoList } = useGeoData();
  // 스탬프 리스트
  const { stampList, isPending } = useStamp();

  useEffect(() => {
    if (stampList) {
      setFilteredStamps(stampList);
    }
  }, [stampList]);

  // 폴리곤 hover 업데이트
  const updateHoverState = useCallback(
    (key: number, isHover: boolean) => {
      setGeoList((prevGeoList) => prevGeoList.map((area) => (area.key === key ? { ...area, isHover } : area)));
    },
    [setGeoList]
  );

  const updatePolygonPath = (path: PathType, index: number) => {
    setActiveIndex(index + 1); // 클릭한 폴리곤 index 저장
    setSelectedPath(path); // 클릭한 폴리곤의 path를 상태에 저장

    const selectedArea = siDoName[index].name;
    const filtered = stampList?.filter((stamp) => stamp.region === selectedArea);

    setFilteredStamps(filtered); // 스탬프 리스트 지역 필터링
  };

  if (isPending) {
    return <Loading />;
  }

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
                onClick={() => updatePolygonPath(path, index)}
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

        {filteredStamps?.map((stamp) => <KakaoMapMarker key={stamp.id} stamp={stamp} />)}
        <KakaoMapOverlay stampList={stampList}/>
        <ReSetttingMapBounds paths={selectedPath} />
      </Map>
      <ScrollButtonSwiper
        activeIndex={activeIndex}
        stampList={stampList}
        setActiveIndex={setActiveIndex}
        setSelectedPath={setSelectedPath}
        setFilteredStamps={setFilteredStamps}
      />
    </>
  );
};

export default KakaoMap;
