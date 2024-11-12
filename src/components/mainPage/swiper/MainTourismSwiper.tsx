'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tourism } from '@/types/tourism/tourism.type';
import MainTourismCard from './MainTourismCard';

import 'swiper/css';
import 'swiper/css/pagination';

interface MainTourismSwiperPropsType {
  tourismList: Tourism[];
  userId: string | undefined;
}

const MainTourismSwiper = ({ tourismList, userId }: MainTourismSwiperPropsType) => {
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
          slidesPerView: 3.7
        }
      }}
      className="mt-5"
    >
      {tourismList
        .filter((_, index) => index < 6)
        .map((tourism) => (
          <SwiperSlide key={tourism.contentid}>
            <MainTourismCard
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

export default MainTourismSwiper;
