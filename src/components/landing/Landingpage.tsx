'use client';

import { FreeMode, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useRef } from 'react';
import { LandingStart } from '@/components/landing/LandingStart';

import Image from 'next/image';
import browserClient from '@/utils/supabase/client';

import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMainSectionVisible, setIsMainSectionVisible] = useState(false);
  const mainsectionRef = useRef(null);
  const [isStampSectionVisible, setIsStampSectionVisible] = useState(false);
  const stampSectionRef = useRef(null);
  const [isTourSectionVisible, setIsTourSectionVisible] = useState(false);
  const tourSectionRef = useRef(null);

  // 옵저버 인터렉션
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }

    const createObserver = (setVisible: (isVisible: boolean) => void) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.3 } // 요소의 30%가 뷰포트에 들어왔을 때
      );
    };
    const mainSectionObserver = createObserver(setIsMainSectionVisible);
    const stampSectionObserver = createObserver(setIsStampSectionVisible);
    const tourSectionObserver = createObserver(setIsTourSectionVisible);

    const mainSectionNode = mainsectionRef.current;
    const stampSectionNode = stampSectionRef.current;
    const tourSectionNode = tourSectionRef.current;

    const observeSection = (observer: IntersectionObserver, node: HTMLElement | null) => {
      if (node) {
        observer.observe(node);
      }
    };

    observeSection(mainSectionObserver, mainSectionNode);
    observeSection(stampSectionObserver, stampSectionNode);
    observeSection(tourSectionObserver, tourSectionNode);

    return () => {
      const observeSection = (observer: IntersectionObserver, node: HTMLElement | null) => {
        if (node) {
          observer.observe(node);
        }
      };

      observeSection(mainSectionObserver, mainSectionNode);
      observeSection(stampSectionObserver, stampSectionNode);
      observeSection(tourSectionObserver, tourSectionNode);
    };
  }, []);

  // 유저유무에 따른 정보확인
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser(); // 유저 정보 확인
      setIsLoggedIn(!!user); // 유저가 존재하면 로그인 상태로 설정
    };

    checkAuth();
  }, []);

  // 성능개선
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout; // 타이머 ID를 저장할 변수
    return (...args: any[]) => {
      clearTimeout(timeout); // 이전 타이머를 취소
      timeout = setTimeout(() => func(...args), wait); //새로운 타이머를 설정->wait지나고 실행
    };
  };

  // 반응형 사이즈조정 : 디바운스 함수
  useEffect(() => {
    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    }, 300);
    if (containerRef.current) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      //메모리누수방지
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, windowWidth]);

  // section3 : 스탬프 이미지
  const StampImgUrl = [
    { region: '울산', url: '/images/landing/section3-icon1.png' },
    { region: '대구', url: '/images/landing/section3-icon2.png' },
    { region: '광주', url: '/images/landing/section3-icon3.png' },
    { region: '서울', url: '/images/landing/section3-icon4.png' },
    { region: '부산', url: '/images/landing/section3-icon5.png' }
  ];

  // section4 : 추천여행지 슬라이드 이미지
  const TourSlideImgUrl = [
    { tour: 'Slide1', url: '/images/landing/section4-slide1.png' },
    { tour: 'Slide2', url: '/images/landing/section4-slide2.png' },
    { tour: 'Slide3', url: '/images/landing/section4-slide3.png' },
    { tour: 'Slide4', url: '/images/landing/section4-slide4.png' },
    { tour: 'Slide5', url: '/images/landing/section4-slide5.png' },
    { tour: 'Slide1copy', url: '/images/landing/section4-slide1.png' },
    { tour: 'Slide2copy', url: '/images/landing/section4-slide2.png' },
    { tour: 'Slide3copy', url: '/images/landing/section4-slide3.png' },
    { tour: 'Slide4copy', url: '/images/landing/section4-slide4.png' },
    { tour: 'Slide5copy', url: '/images/landing/section4-slide5.png' }
  ];

  return (
    <>
      <div className="lg:flex lg:flex-col" ref={containerRef}>
        <section className="section1 mt-[56px] hidden bg-white lg:block">
          <div className="top">
            <div className="relative h-full w-[50%]">
              <Image
                src={`/images/landing/logo-w.png`}
                alt={''}
                layout="responsive"
                width={100}
                height={100}
                className="absolute left-[50%] top-[50%] !w-[159px] translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
            <div className="w-[50%]"></div>
          </div>

          <div className="flex">
            <div className="flex w-[50%] flex-col items-center justify-center">
              <h2 className={`mb-[14px] font-bold text-[36px] text-[#00688A]`}>국내 여행 스탬프 서비스 모아</h2>
              <span className="leading-[24px] text-[#4F4F4F]">
                이전에는 YOLO라며 해외여행, 오마카세등을 즐기는 추세였다면
                <br />
                <b>최근에는 YONO로 해외여행이 줄어들고 있는 추세</b>입니다.
                <br />
                이런 시기에 해외여행을 대체할 수 있는 <b>가성비 국내여행을 하는</b>
                <br />
                <b>사람들에게 내가 갔었던 여행에 대한 기록을 남겨 추억하게 하는</b>
                <br />
                <b>플랫폼</b>을 제작하는것을 목표로 생각하였습니다.
                <br />
                다들 스템프 투어를 하더라도 집으로 들고가면 하루 이틀 지났을 때<br />
                필요없는 물건이 되어 버리곤 하는데 그것을{' '}
                <b>
                  온라인으로 옮기면서
                  <br />
                  반영구적으로 보관
                </b>
                도 가능합니다.
              </span>
            </div>
            <Image
              src={`/images/landing/section1-2.png`}
              alt={''}
              layout="responsive"
              width={100}
              height={100}
              className="move-img !w-[50%]"
            />
          </div>
        </section>
        <section className="hidden h-full bg-white px-[24px] pt-[220px] lg:block" ref={mainsectionRef}>
          <div className="pc-inner-width main-section-bg">
            <h2 className={`sectionTitle-Navy opacity-0 ${isMainSectionVisible ? 'main-section-fade1' : ''}`}>
              여행, 그리고 기록
            </h2>
            <h3 className={`sectionTitle-Black opacity-0 ${isMainSectionVisible ? 'main-section-fade2' : ''}`}>
              여행기록부터
              <br />
              스탬프 수집까지 모아랑 함께.
            </h3>
            <div className={`flex ${windowWidth && windowWidth >= 1920 ? 'h-[80vh]' : 'h-[100vh]'} min-h-[1100px]`}>
              <ul className="relative flex h-full flex-1 justify-between">
                <Image
                  src={`/images/landing/section2-phoneL.png`}
                  alt={''}
                  layout="responsive"
                  width={100}
                  height={100}
                  className={`main-section-phone main-section-phone-R opacity-0 ${isMainSectionVisible ? 'phone-fadeUp' : ''}`}
                />
                <Image
                  src={`/images/landing/section2-phoneR.png`}
                  alt={''}
                  layout="responsive"
                  width={100}
                  height={100}
                  className={`main-section-phone main-section-phone-L opacity-0 ${isMainSectionVisible ? 'phone-fadeDown' : ''}`}
                />
              </ul>
            </div>
          </div>
        </section>
        <section className="hidden bg-white px-[24px] pt-[220px] lg:block" ref={stampSectionRef}>
          <div className="pc-inner-width">
            <h2 className={`sectionTitle-Navy opacity-0 ${isStampSectionVisible ? 'main-section-fade1' : ''}`}>
              스탬프
            </h2>
            <h3 className={`sectionTitle-Black opacity-0 ${isStampSectionVisible ? 'main-section-fade2' : ''}`}>
              수집하고픈
              <br />
              아기자기한 스탬프들
            </h3>
            <div className={`flex ${windowWidth && windowWidth >= 1920 ? 'h-[80vh]' : 'h-[100vh]'} min-h-[1000px]`}>
              <ul className="flex h-full w-full items-center justify-center">
                <Image
                  src={`/images/landing/section3-phone-1.png`}
                  alt={''}
                  layout="responsive"
                  width={100}
                  height={100}
                  className="stamp-section-phone"
                />
                <div className="relative z-10 h-full w-full">
                  {StampImgUrl.map((item, index) => (
                    <span
                      key={item.region}
                      className={`region-stamp stamp${index + 1} opacity-0 ${isStampSectionVisible ? 'fadeUp animate-bounceLoading' : ''}`}
                    >
                      <Image src={item.url} alt={item.region} width={200} height={200} />
                    </span>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </section>
        <section className="hidden bg-white pt-[220px] lg:block" ref={tourSectionRef}>
          <div className="relative h-[80vh] min-h-[1100px]">
            <h2
              className={`sectionTitle-Navy pc-inner-width px-[24px] opacity-0 ${isTourSectionVisible ? 'main-section-fade1' : ''}`}
            >
              추천 여행지
            </h2>
            <h3
              className={`sectionTitle-Black pc-inner-width px-[24px] opacity-0 ${isTourSectionVisible ? 'main-section-fade1' : ''}`}
            >
              모아가 엄선한
              <br />
              국내 추천 여행지
            </h3>
            <div className="relative pt-[72px]">
              <Swiper
                slidesPerView={5}
                spaceBetween={24}
                loop={true}
                freeMode={true}
                speed={2000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false
                }}
                breakpoints={{
                  1024: {
                    slidesPerView: 4
                  },
                  1900: {
                    slidesPerView: 5
                  }
                }}
                modules={[FreeMode, Autoplay]}
                className="mySwiper landing-tour-slide w-full"
              >
                {TourSlideImgUrl.map((slide) => (
                  <SwiperSlide key={slide.tour}>
                    <Image src={slide.url} alt={slide.tour} layout="responsive" width={100} height={100} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <ul className="tour-subText absolute left-0 top-[93px] z-10 w-full">
              <div className="pc-inner-width relative flex justify-end">
                <div className="relative flex flex-row-reverse gap-[38px]">
                  <Image
                    src={`/images/landing/section4-phone.png`}
                    alt={''}
                    layout="responsive"
                    width={100}
                    height={100}
                    className="tour-section-phone"
                  />
                  <span className="mb-9 flex items-end whitespace-pre-line text-right text-2xl font-semibold leading-[41px] text-[#1d1d1d]">
                    모아가 고른 국내
                    <br />
                    여행지를 탐색해 보세요
                  </span>
                </div>
              </div>
            </ul>
          </div>
        </section>
        <LandingStart isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
};

export default LandingPage;
