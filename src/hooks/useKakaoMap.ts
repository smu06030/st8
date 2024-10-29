'use client';

import { useMapStore } from '@/providers/mapStoreProvider';
import { PathType } from '@/types/stampMap/CoordRegionCode.types';
import useGeoData from './useGeoData';
import { Swiper as SwiperProps } from 'swiper/types';
import { useCallback, useEffect } from 'react';
import useStamp from './useStamp';

const useKakaoMap = () => {
  const { stampList } = useStamp();
  const { geoList, siDoName, setGeoList } = useGeoData();
  const { location, activeIndex, selectedPath, filteredStamps, setActiveIndex, setSelectedPath, setFilteredStamps } =
    useMapStore((state) => state);

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

  // 폴리곤 path 업데이트
  const updatePolygonPath = (path: PathType, index: number) => {
    setActiveIndex(index + 1); // 클릭한 폴리곤 index 저장
    setSelectedPath(path); // 클릭한 폴리곤의 path를 상태에 저장

    const selectedArea = siDoName[index].name;
    const filtered = stampList?.filter((stamp) => stamp.region === selectedArea);

    setFilteredStamps(filtered); // 스탬프 리스트 지역 필터링
  };

  // 가로 스크롤 버튼 변경
  const onSlideChangeHandler = (swiper: SwiperProps) => {
    const activeIndex = swiper.activeIndex;
    setActiveIndex(activeIndex);
    setSelectedPath(activeIndex === 0 ? siDoName.flatMap((sido) => sido.path) : siDoName[activeIndex - 1].path);

    const filtered =
      activeIndex === 0 ? stampList : stampList?.filter((stamp) => stamp.region === siDoName[activeIndex - 1].name);

    setFilteredStamps(filtered);
  };

  return {
    geoList,
    siDoName,
    location,
    stampList,
    activeIndex,
    selectedPath,
    filteredStamps,
    updateHoverState,
    updatePolygonPath,
    onSlideChangeHandler
  };
};

export default useKakaoMap;
