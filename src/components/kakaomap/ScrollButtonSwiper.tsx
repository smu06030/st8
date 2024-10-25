'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import useGeoData from '@/hooks/useGeoData';

const ScrollButtonSwiper = () => {
  const { geoList } = useGeoData();
  return (
    <Swiper
      slidesPerView={'auto'}
      // spaceBetween={30}
      centeredSlides={true}
      pagination={{
        dynamicBullets: true
        // clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mb-8 mt-8"
    >
      {geoList.map((geo) => (
        <SwiperSlide key={geo.name} className="m-4 p-4 text-center">
          {geo.name}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ScrollButtonSwiper;
