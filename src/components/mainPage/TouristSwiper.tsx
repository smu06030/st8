'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PlaceCard from '@/components/tourism/placeCard';
import { Place } from '@/types/place/place.type';

import 'swiper/css';
import 'swiper/css/pagination';

interface TouristSwiperPropsType {
  places: Place[];
}

const TouristSwiper = ({ places }: TouristSwiperPropsType) => {
  return (
    <Swiper
      slidesPerView={1.1}
      spaceBetween={10}
      centeredSlides={false}
      grabCursor={true}
      modules={[Pagination]}
      breakpoints={{
        480: {
          slidesPerView: 2.1
        },
        640: {
          slidesPerView: 3.1
        },
        1024: {
          slidesPerView: 4.1
        }
      }}
      className="mt-5"
    >
      {places
        .filter((_, index) => index < 4)
        .map((place) => (
          <SwiperSlide key={place.contentid}>
            <PlaceCard
              key={place.contentid}
              contentid={place.contentid || '등록되지 않는 여행지'}
              title={place.title || '등록되지 않는 여행지'}
              firstimage={place.firstimage}
              description={place.supabaseText || '여행지 정보 없음'}
              isBookmarked={place.isBookmarked}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default TouristSwiper;
