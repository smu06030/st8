'use client';
import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
// import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/mousewheel';
SwiperCore.use([Mousewheel]);
interface CategoryNodalType {
  setRegionCate: Dispatch<React.SetStateAction<string>>;
  onHandleUpload: (imgArr: string | string[]) => void;
}

const CategoryModal = ({ onHandleUpload, setRegionCate }: CategoryNodalType) => {
  const cate = [
    '서울',
    '경기',
    '인천',
    '강원특별자치도',
    '부산',
    '대구',
    '울산',
    '세종특별자치시',
    '충북',
    '충남',
    '대전',
    '전북특별자치도',
    '전남',
    '광주',
    '경북',
    '경남',
    '제주'
  ];
  //   const [selectedRegion, setSelectedRegion] = useState(regionCate);
  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex; //활성화된인덱스번호
    const activeRegion = cate[activeIndex]; //선택한 지역이름
    setRegionCate(activeRegion); //선택한 지역이름 저장
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#363636] bg-opacity-50">
      <div className="relative flex h-[60vh] w-[90%] flex-col rounded-[24px] bg-white px-[32px] py-[36px]">
        <h2 className="font-semiBold text-[20px] leading-[26px]">
          이 사진에 어떤 장소의
          <br />
          추억이 담겨있나요?
        </h2>
        <div className="flex h-[69%] flex-col items-center">
          <div className="modal-swiper flex h-full w-full flex-1 flex-col justify-center">
            <div className="items-col flex flex-col py-[31px]">
              <Swiper
                // loop={true}
                direction="vertical"
                // spaceBetween={20}
                slidesPerView={5}
                centeredSlides={true}
                mousewheel={true}
                onSlideChange={handleSlideChange}
              >
                {cate.map((region, index) => (
                  <SwiperSlide key={index} className="modal-slide">
                    <span>{region}</span>
                    {/* <label>{region}</label> */}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => onHandleUpload('')}
            className="w-full rounded-[12px] bg-[#FFC914] py-[20px] font-semiBold text-[#473700]"
          >
            업로드
          </button>
          <label className="mt-[18px] flex items-center justify-center underline">
            <input type="checkbox" className="" />
            지역을 설정하지 않을래요
          </label>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
