'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../common/Buttons/Button';
import CameraIcon from '../common/Icons/LandingIcons/CameraIcon';
import CompassIcon from '../common/Icons/LandingIcons/CompassIcon';
import ArrowIcon from '../common/Icons/LandingIcons/ArrowIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';

//성능개선
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout; // 타이머 ID를 저장할 변수
  return (...args: any[]) => {
    clearTimeout(timeout); // 이전 타이머를 취소
    timeout = setTimeout(() => func(...args), wait); //새로운 타이머를 설정->wait지나고 실행
  };
};

const LandingPage = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const [isMainSectionVisible, setIsMainSectionVisible] = useState(false);
  const mainsectionRef = useRef(null);
  const [isStampSectionVisible, setIsStampSectionVisible] = useState(false);
  const stampSectionRef = useRef(null);
  const [isTourSectionVisible, setIsTourSectionVisible] = useState(false);
  const tourSectionRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }

    const mainSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsMainSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.4 } // 요소의 40%가 뷰포트에 들어왔을 때
    );

    const stampSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsStampSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // 요소의 50%가 뷰포트에 들어왔을 때
    );

    const tourSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsTourSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // 요소의 50%가 뷰포트에 들어왔을 때
    );

    if (mainsectionRef.current) {
      mainSectionObserver.observe(mainsectionRef.current);
    }
    if (stampSectionRef.current) {
      stampSectionObserver.observe(stampSectionRef.current);
    }
    if (tourSectionRef.current) {
      tourSectionObserver.observe(tourSectionRef.current);
    }

    return () => {
      if (mainsectionRef.current) {
        mainSectionObserver.unobserve(mainsectionRef.current);
      }
      if (stampSectionRef.current) {
        stampSectionObserver.unobserve(stampSectionRef.current);
      }
      if (tourSectionRef.current) {
        tourSectionObserver.unobserve(tourSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser(); // 유저 정보 확인
      setIsLoggedIn(!!user); // 유저가 존재하면 로그인 상태로 설정
    };

    checkAuth();
  }, []);

  const goToLoginOrHome = () => {
    if (isLoggedIn) {
      router.push('/home'); // 로그인 상태일 때 홈으로 이동
    } else {
      router.push('/login'); // 비로그인 상태일 때 로그인 페이지로 이동
    }
  };

  // const goToLogin = () => {
  //   router.push('/login');
  // };

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

  //pc - 단하나 텍스트 통통 애니메이션
  const text1 = '단';
  const text2 = '하나의';
  const animatedText1 = text1.split('').map((char, index) => (
    <span key={index} className="bounce">
      {char}
    </span>
  ));
  const animatedText2 = text2.split('').map((char, index) => (
    <span key={index} className="bounce bounce2">
      {char}
    </span>
  ));

  const StampImgUrl = [
    { region: '울산', url: '/images/landing/section3-icon1.png' },
    { region: '대구', url: '/images/landing/section3-icon2.png' },
    { region: '광주', url: '/images/landing/section3-icon3.png' },
    { region: '서울', url: '/images/landing/section3-icon4.png' },
    { region: '부산', url: '/images/landing/section3-icon5.png' }
  ];

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
      {/* PC-랜딩화면 */}
      <div className="hidden lg:flex lg:flex-col" ref={containerRef}>
        <section className="bg-white">
          <Image src={`/images/landing/section1-1.png`} alt={''} layout="responsive" width={100} height={100} />
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
        <section className="h-full bg-white pt-[220px]" ref={mainsectionRef}>
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
        <section className="bg-white pt-[220px]" ref={stampSectionRef}>
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
                  src={`/images/landing/section3-phone.png`}
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
        <section className="bg-white pt-[220px]" ref={tourSectionRef}>
          <div className="relative h-[80vh] min-h-[1100px]">
            <h2
              className={`sectionTitle-Navy pc-inner-width opacity-0 ${isTourSectionVisible ? 'main-section-fade1' : ''}`}
            >
              추천 여행지
            </h2>
            <h3
              className={`sectionTitle-Black pc-inner-width opacity-0 ${isTourSectionVisible ? 'main-section-fade1' : ''}`}
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

        <section className="flex h-full flex-col items-center justify-between gap-[38px] overflow-hidden border-b border-[#828282] bg-white pb-[15%] pt-[10%]">
          <div className="relative flex min-h-[70vh] w-full flex-grow items-center justify-center">
            <div className="absolute h-[30%]">
              <CameraIcon />
            </div>
            <div className="absolute h-[50%]">
              <CompassIcon />
            </div>
            <div className="absolute h-[60%]">
              <ArrowIcon />
            </div>
          </div>
          <div className="flex flex-col items-center gap-[16px]">
            <h2 className={`sectionTitle-Black`}>
              모아는 당신을 위한{' '}
              <strong className="text-[#008EBD]">
                {animatedText1} {animatedText2} 여행기
              </strong>{' '}
              입니다.
            </h2>
            <span className="text-gray-900">내 손안에 여행기 모아와 함께 여행을 떠나요.</span>
          </div>
          <div className="mb-[50px] flex w-full flex-col items-center justify-center px-6">
            <Button text="여행 떠나기" variant="blue" onClick={goToLoginOrHome} />
          </div>
        </section>
      </div>

      {/*****  MO-랜딩화면 *****/}
      <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-between overflow-hidden lg:hidden">
        {/* 아이콘 영역 */}
        <div className="flex w-full flex-grow items-center justify-center">
          <div className="absolute h-[30%]">
            <CameraIcon />
          </div>
          <div className="absolute h-[50%]">
            <CompassIcon />
          </div>
          <div className="absolute h-[60%]">
            <ArrowIcon />
          </div>
        </div>

        {/* 여행 떠나기 버튼 */}
        <div className="flex w-full flex-col items-center justify-center px-6">
          <Button text="여행 떠나기" variant="blue" onClick={goToLoginOrHome} />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
