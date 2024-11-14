'use client';

import { Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useKakaoMap from '@/hooks/useKakaoMap';
import Icon from '../common/Icons/Icon';

import 'swiper/css';
import 'swiper/css/pagination';

import '@/styles/mapSwiper.css';

const MapButtonSwiper = () => {
  const { activeIndex, siDoName, onSlideChangeHandler } = useKakaoMap();
  const swiperRef = useRef<any>(null); // Swiper 인스턴스 참조

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex); // activeIndex 변경 시 slide 이동
    }
  }, [activeIndex]);

  console.log(siDoName);

  return (
    <div className="swiperWrapper">
      <div className="ml-[10px] flex items-center justify-center">
        <Icon name="PolygonIcon" size={28} color="#008EBD" />
      </div>
      <Swiper
        key="kakaomap-button-swiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={5}
        centeredSlides={true}
        grabCursor={true}
        onSlideChange={onSlideChangeHandler}
        modules={[Pagination]}
        className="swiper"
        style={{ overflow: 'visible' }}
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
