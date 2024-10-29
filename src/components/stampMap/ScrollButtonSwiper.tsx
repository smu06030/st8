'use client';
import React, { useEffect, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperProps } from 'swiper/types';

import '@/styles/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import useGeoData from '@/hooks/useGeoData';
import { PathType } from '@/types/stampMap/CoordRegionCode.types';
import { StampType } from '@/types/stampMap/Stamp.types';

interface ScrollButtonSwiperPropsType {
  activeIndex: number;
  stampList: StampType[] | undefined;
  setActiveIndex: (activeIndex: number) => void;
  setSelectedPath: (path: PathType) => void;
  setFilteredStamps: (stampList: StampType[] | undefined) => void;
}

const ScrollButtonSwiper = ({
  activeIndex,
  stampList,
  setActiveIndex,
  setSelectedPath,
  setFilteredStamps
}: ScrollButtonSwiperPropsType) => {
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
    setSelectedPath(activeIndex === 0 ? siDoName.flatMap((sido) => sido.path) : siDoName[activeIndex - 1].path);

    const filtered =
      activeIndex === 0 ? stampList : stampList?.filter((stamp) => stamp.region === siDoName[activeIndex - 1].name);

    setFilteredStamps(filtered);
  };

  return (
    <div className="fixed bottom-0 left-2/4 z-[99] w-[100vw] -translate-x-1/2 transform bg-gradient-to-t from-[rgba(66,66,66,0.8)] to-[rgba(255,255,255,0)]">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={5}
        // spaceBetween={30}
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
