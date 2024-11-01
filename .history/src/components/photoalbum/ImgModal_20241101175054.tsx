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
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('activeImgId', activeImgId);
  console.log('activeImgId', currentIndex);

  useEffect(() => {
    const index = regionPhoto.findIndex((photo) => photo.id === activeImgId);
    setCurrentIndex(index !== -1 ? index : 0);
  }, [activeImgId, regionPhoto]);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper[swiper.activeIndex]);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#363636] bg-opacity-50">
      <div className="relative h-[90vh] w-full bg-[#D9D9D9]">
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          onSlideChange={handleSlideChange}
          initialSlide={currentIndex} // 초기 슬라이드 설정
          className="mySwiper h-full"
        >
          {regionPhoto.map((photo, index) => (
            <SwiperSlide key={index}>
              <Image src={photo.photoImg} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" />
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
