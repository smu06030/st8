'use client';
import React, { useEffect, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperProps } from 'swiper/types';

import '@/styles/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import useGeoData from '@/hooks/useGeoData';
import { PathType } from '@/types/kakaomap/CoordRegionCode.type';

interface ScrollButtonSwiperPropsType {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  setSelectedPath: (path: PathType) => void;
}

const ScrollButtonSwiper = ({ activeIndex, setActiveIndex, setSelectedPath }: ScrollButtonSwiperPropsType) => {
  const { siDoName } = useGeoData();
  const swiperRef = useRef<any>(null); // Swiper 인스턴스 참조

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex); // activeIndex 변경 시 slide 이동
    }
  }, [activeIndex]);

  const onSlideChangeHandler = (swiper: SwiperProps) => {
    const activeIndex = swiper.activeIndex;

    setActiveIndex(activeIndex);

    if (activeIndex === 0) {
      // 전체 선택 시 모든 path 병합 후 설정
      const allPaths = siDoName.flatMap((sido) => sido.path);
      setSelectedPath(allPaths);
    } else {
      // 특정 시/도 선택 시 해당 path 설정
      setSelectedPath(siDoName[activeIndex - 1].path);
    }
  };

  return (
    <div className="fixed bottom-0 left-2/4 z-[99] w-[100vw] -translate-x-1/2 transform bg-gradient-to-t from-[rgba(66,66,66,0.8)] to-[rgba(255,255,255,0)]">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={5}
        spaceBetween={30}
        centeredSlides={true}
        grabCursor={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        navigation={true}
        onSlideChange={onSlideChangeHandler}
        modules={[Navigation, Pagination]}
        className="swiper"
      >
        <SwiperSlide>
          <div className={`swiper-slide ${activeIndex === 0 ? 'swiper-slide-active' : ''}`}>전체</div>
        </SwiperSlide>
        {siDoName.map((sido, index) => (
          <SwiperSlide key={sido.key}>
            <div className={`swiper-slide ${activeIndex === index + 1 ? 'swiper-slide-active' : ''}`}>{sido.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScrollButtonSwiper;
