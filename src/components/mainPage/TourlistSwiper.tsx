'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PlaceCard from '@/components/tourism/PlaceCard';
import { Tourism } from '@/types/tourism/tourism.type';

import 'swiper/css';
import 'swiper/css/pagination';

interface TourlistSwiperPropsType {
  tourismList: Tourism[];
  userId: string | undefined;
}

const TourlistSwiper = ({ tourismList, userId }: TourlistSwiperPropsType) => {
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
      {tourismList
        .filter((_, index) => index < 10)
        .map((tourism, index) => (
          <SwiperSlide key={tourism.contentid} className={`${index === 0 ? 'ml-6' : ''}`}>
            <PlaceCard
              key={tourism.contentid}
              userId={userId}
              contentId={tourism.contentid || '등록되지 않는 여행지'}
              title={tourism.title || '등록되지 않는 여행지'}
              firstimage={tourism.firstimage}
              description={tourism.supabaseText || '여행지 정보 없음'}
              isBookmarked={tourism.isBookmarked}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default TourlistSwiper;
