'use client';

import React, { useEffect, useRef } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import '@/styles/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import useKakaoMap from '@/hooks/useKakaoMap';
import Icon from '../common/Icons/Icon';

const MapButtonSwiper = () => {
  const { activeIndex, siDoName, onSlideChangeHandler } = useKakaoMap();
  const swiperRef = useRef<any>(null); // Swiper 인스턴스 참조

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex); // activeIndex 변경 시 slide 이동
    }
  }, [activeIndex]);

  return (
    <div className="swiperWrapper">
      <div className="flex items-center justify-center">
        <Icon name="PolygonIcon" size={16} color="#008EBD" />
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={5}
        centeredSlides={true}
        grabCursor={true}
        onSlideChange={onSlideChangeHandler}
        modules={[Pagination]}
        className="swiper"
      >
        <SwiperSlide>
          <div className={`swiper-slide px-4 py-3 ${activeIndex === 0 ? 'swiper-slide-active' : ''}`}>전체</div>
        </SwiperSlide>
        {siDoName.map((sido, index) => (
          <SwiperSlide key={sido.key}>
            <div className={`swiper-slide px-4 py-3 ${activeIndex === index + 1 ? 'swiper-slide-active' : ''}`}>
              {sido.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MapButtonSwiper;
