'use client';
import React, { ReactPortal } from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/mousewheel';
import { REGION_CATEGORY_NAMES } from '@/utils/region/RegionNames';

interface CategoryNodalType {
  Modal: ({ children }: { children: React.ReactNode }) => ReactPortal | null;
  setRegionCate: Dispatch<React.SetStateAction<string>>;
  onHandleUpload: (imgArr: string | string[]) => void;
  regionCate: string;
}

const RegionCategoryModal = ({ Modal, onHandleUpload, setRegionCate, regionCate }: CategoryNodalType) => {
  const [isNotsetSelect, setIsNotsetSelect] = useState(false);

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex; //활성화된인덱스번호

    setRegionCate(REGION_CATEGORY_NAMES[activeIndex]); //선택한 지역이름 저장
  };

  const handleNotSet = () => {
    setIsNotsetSelect((prev) => !prev);
    setRegionCate('미설정 지역');
    if (!isNotsetSelect) {
      const activeSlide = document.querySelector('.swiper-slide-active');
      console.log('activeSlide', activeSlide);
      if (activeSlide) {
        activeSlide.classList.remove('swiper-slide-active');
        console.log('지역없음');
      }
    }
  };

  return (
    <Modal>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box flex h-[65vh] w-[90%] flex-col rounded-[24px] px-[32px] py-[36px] lg:h-[497px] lg:w-[327px] lg:pb-[53px]"
      >
        <h2 className="font-semiBold text-[20px] leading-[26px]">
          이 사진에 어떤 장소의
          <br />
          추억이 담겨있나요?
        </h2>
        <div className="flex h-[69%] flex-col items-center">
          <div className="modal-swiper flex h-full w-full flex-1 flex-col justify-center">
            <div className="items-col flex flex-col overflow-hidden py-[31px]">
              <Swiper
                direction="vertical"
                slidesPerView={5}
                centeredSlides={true}
                mousewheel={true}
                onSlideChange={handleSlideChange}
              >
                {REGION_CATEGORY_NAMES.map((region, index) => (
                  <SwiperSlide key={index} className="modal-slide">
                    <span>{region}</span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => onHandleUpload('')}
            className="w-full rounded-[12px] bg-secondary-500 py-[20px] font-semiBold text-[#473700]"
          >
            업로드
          </button>
          <label className="mt-[18px] flex items-center justify-center underline">
            <span onClick={handleNotSet} className={`${isNotsetSelect ? 'font-bold' : ''} cursor-pointer"`}>
              지역을 설정하지 않을래요
            </span>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default RegionCategoryModal;
