'use client';
import React, { useEffect, useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import '@/styles/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import useKakaoMap from '@/hooks/useKakaoMap';

const ScrollButtonSwiper = () => {
  const { activeIndex, siDoName, onSlideChangeHandler } = useKakaoMap();
  const swiperRef = useRef<any>(null); // Swiper 인스턴스 참조

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex); // activeIndex 변경 시 slide 이동
    }
  }, [activeIndex]);

  return (
    <div className="fixed bottom-0 left-2/4 z-[99] w-[100vw] -translate-x-1/2 transform bg-gradient-to-t from-[rgba(66,66,66,0.8)] to-[rgba(255,255,255,0)]">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={5}
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
