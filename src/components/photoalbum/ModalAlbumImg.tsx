import Image from 'next/image';
import React, { ReactPortal } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

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
  Modal: ({ children }: { children: React.ReactNode }) => ReactPortal | null;
}

const ImgModal = ({
  setImgModal,
  selectedImgUrl,
  regionPhoto,
  activeImgId,
  currentIndex,
  setCurrentIndex,
  Modal
}: ImageModalType) => {
  return (
    <Modal>
      <div className="relative h-[100vh] w-full bg-[#D9D9D9] bg-transparent lg:left-1/2 lg:top-1/2 lg:h-[50vh] lg:w-[60vw] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform">
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Navigation]}
          initialSlide={currentIndex}
          className="mySwiper album-swiper h-full"
        >
          {regionPhoto &&
            regionPhoto.map((photo: photoInfoType, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={photo.photoImg}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  className="object-cover lg:object-contain lg:px-[10%]"
                />
              </SwiperSlide>
            ))}
        </Swiper>
        {/* <button className="absolute right-[10px] top-[-30px] text-white" onClick={() => setImgModal(false)}>
          X
        </button> */}
      </div>
    </Modal>
  );
};

export default ImgModal;
