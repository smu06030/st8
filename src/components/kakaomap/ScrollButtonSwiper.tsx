'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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

  // console.log(siDoName);
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
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setSelectedPath(siDoName[swiper.activeIndex].path);
        }}
        modules={[Navigation, Pagination]}
        className="swiper"
      >
        {siDoName.map((sido, index) => (
          <SwiperSlide key={sido.key}>
            <div className={`swiper-slide ${activeIndex === index ? 'swiper-slide-active' : ''}`}>{sido.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScrollButtonSwiper;
