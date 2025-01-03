'use client';

import { Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Icon from '@/components/common/Icons/Icon';
import useKakaoMap from '@/hooks/map/useKakaoMap';

import 'swiper/css';
import 'swiper/css/pagination';

import '@/styles/mapSwiper.css';

const KakaoMapSwiper = () => {
  const { activeIndex, siDoName, setActiveIndex, onSlideChangeHandler } = useKakaoMap();
  const swiperRef = useRef<any>(null); // Swiper 인스턴스 참조

  // activeIndex 변경 시 slide 이동
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  // 스와이퍼 버튼 클릭 이벤트
  const onClickSwiper = (activeIndex: number) => {
    setActiveIndex(activeIndex);
  };

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
        className="swiper map-region-swiper"
        style={{ overflow: 'visible' }}
      >
        <SwiperSlide>
          <div
            onClick={() => onClickSwiper(0)}
            className={`swiper-slide cursor-pointer px-4 py-3 ${activeIndex === 0 ? 'swiper-slide-active' : ''}`}
          >
            전체
          </div>
        </SwiperSlide>
        {siDoName.map((sido, index) => (
          <SwiperSlide key={sido.key}>
            <div
              onClick={() => onClickSwiper(index + 1)}
              className={`swiper-slide cursor-pointer px-4 py-3 ${activeIndex === index + 1 ? 'swiper-slide-active' : ''}`}
            >
              {sido.name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KakaoMapSwiper;
