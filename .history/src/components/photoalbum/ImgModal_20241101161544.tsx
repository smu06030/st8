import React from 'react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/mousewheel';

interface ImageModalType {
  images: string[];
  setImgModal: Dispatch<SetStateAction<boolean>>;
}
const ImgModal = ({ setImgModal, images }: ImageModalType) => {
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
          {images.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <Image src={imgUrl} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" />
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
