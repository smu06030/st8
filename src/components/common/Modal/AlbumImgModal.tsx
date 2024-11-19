import { ReactPortal, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';
import { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';
import RoundedArrowButton from '@/components/photoalbum/AlbumImgArrowBtn';

import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

interface photoInfoType {
  created_at: string;
  id: number;
  photoImg: string | null;
  region: string | null;
  user_id: string | null;
}
interface ImageModalType {
  selectedImgUrl: string;
  setImgModal: Dispatch<SetStateAction<boolean>>;
  regionPhoto: photoInfoType[] | undefined | null;
  activeImgId: number | null;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  Modal: ({ children }: { children: React.ReactNode }) => ReactPortal | null;
}

const AlbumImgModal = ({
  setImgModal,
  selectedImgUrl,
  regionPhoto,
  activeImgId,
  currentIndex,
  setCurrentIndex,
  Modal
}: ImageModalType) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <Modal>
      <div className="relative h-[100vh] w-full bg-[#D9D9D9] bg-transparent lg:left-1/2 lg:top-1/2 lg:h-[50vh] lg:w-[80vw] lg:max-w-[833px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false
          // }}
          initialSlide={currentIndex}
          className="mySwiper album-swiper h-full"
        >
          {regionPhoto &&
            regionPhoto.map((photo: photoInfoType, index: number) => (
              <SwiperSlide key={index} className="lg:bg-[#000]">
                <Image
                  src={photo.photoImg || ''}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  className="object-cover lg:bg-[#000] lg:object-contain"
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="absolute left-[-111px] top-1/2 h-[64px] w-[64px] -translate-y-1/2 transform">
          <RoundedArrowButton handleClick={handlePrev} direction="left" disabled={false} />
        </div>
        <div className="absolute right-[-111px] top-1/2 h-[64px] w-[64px] -translate-y-1/2 transform">
          <RoundedArrowButton handleClick={handleNext} direction="right" disabled={false} />
        </div>
      </div>
    </Modal>
  );
};

export default AlbumImgModal;
