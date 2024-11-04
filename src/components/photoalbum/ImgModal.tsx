import React, { useState } from 'react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/mousewheel';

interface photoInfoType {
  created_at: string;
  id: number;
  photoImg: string;
  region: string;
  user_id: string;
}
interface ImageModalType {
  selectedImgUrl: string;
  setImgModal: Dispatch<SetStateAction<boolean>>;
  regionPhoto: photoInfoType[] | undefined | null;
  activeImgId: number | string;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  // setActiveImgId: Dispatch<SetStateAction<number>>;
}
const ImgModal = ({
  setImgModal,
  selectedImgUrl,
  regionPhoto,
  activeImgId,
  currentIndex,
  setCurrentIndex
}: ImageModalType) => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#363636] bg-opacity-50">
      <div className="relative h-[90vh] w-full bg-[#D9D9D9]">
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          initialSlide={currentIndex}
          className="mySwiper h-full"
        >
          {regionPhoto &&
            regionPhoto.map((photo: photoInfoType, index: number) => (
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
