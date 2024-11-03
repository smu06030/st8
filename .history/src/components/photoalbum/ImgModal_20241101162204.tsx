import React from 'react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/mousewheel';

interface ImageModalType {
  selectedImgUrl: string[];
  setImgModal: Dispatch<SetStateAction<boolean>>;
}
const ImgModal = ({ setImgModal, selectedImgUrl }: ImageModalType) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#363636] bg-opacity-50">
      <div className="relative h-[90vh] w-full bg-[#D9D9D9]">
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {selectedImgUrl.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <Image src={imgUrl} alt={`Image ${index + 1}`} width={200} height={200} />
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
