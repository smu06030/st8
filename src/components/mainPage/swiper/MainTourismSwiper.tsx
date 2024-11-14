'use client';

import { useEffect, useRef, useState } from 'react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Tourism } from '@/types/tourism/tourism.type';
import MainTourismCard from './MainTourismCard';
import useMediaSize from '@/hooks/useMediaSize';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/styles/mainSwiper.css';

interface MainTourismSwiperPropsType {
  tourismList: Tourism[];
  userId: string | undefined;
}

const MainTourismSwiper = ({ tourismList, userId }: MainTourismSwiperPropsType) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null); // Swiper 인스턴스 참조
  const isDesktop = useMediaSize();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.init();
    }
  }, []);

  return (
    <>
      {isDesktop ? (
        <Swiper
          key="desktop-swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={3.7}
          spaceBetween={10}
          centeredSlides={true}
          initialSlide={2}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="mainTourism-swiper mt-5 h-full lg:mt-[26px]"
          style={{ overflow: 'visible', overflowX: 'clip' }}
        >
          {tourismList
            .filter((_, index) => index < 6)
            .map((tourism, index) => (
              <SwiperSlide key={tourism.contentid} className="swiper-slide">
                <MainTourismCard
                  key={tourism.contentid}
                  userId={userId}
                  contentId={tourism.contentid || '등록되지 않는 여행지'}
                  title={tourism.title || '등록되지 않는 여행지'}
                  firstimage={tourism.firstimage}
                  description={tourism.supabaseText || '여행지 정보 없음'}
                  isBookmarked={tourism.isBookmarked}
                  activeIndex={activeIndex}
                  index={index}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <Swiper
          key="mobile-swiper"
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
              <SwiperSlide key={tourism.contentid} className="swiper-slide">
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
      )}
    </>
  );
};

export default MainTourismSwiper;
