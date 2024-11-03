import React, { useState } from 'react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/mousewheel';
// import useImgModal from '@/hooks/useImgModal';

interface ImageModalType {
  selectedImgUrl: string;
  setImgModal: Dispatch<SetStateAction<boolean>>;
  regionPhoto: any;
  activeImgId: string;
  setActiveImgId: Dispatch<SetStateAction<string>>;
}
const ImgModal = ({ setImgModal, selectedImgUrl, regionPhoto, activeImgId, setActiveImgId }: ImageModalType) => {
  // console.log('selectedImgUrl', selectedImgUrl);
  // console.log('setActiveImgId', setActiveImgId);
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#363636] bg-opacity-50">
      <div className="relative h-[90vh] w-full bg-[#D9D9D9]">
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          // initialSlide={} // 초기 슬라이드 설정
          className="mySwiper"
        >
          {regionPhoto.map((photo, index) => (
            <SwiperSlide key={index} className={activeImgId === index ? 'active' : ''}>
              <Image src={photo.photoImg} alt={`Image ${index + 1}`} width={200} height={200} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="absolute right-[10px] top-[-30px] text-white" onClick={() => setImgModal(false)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ImgModal;
