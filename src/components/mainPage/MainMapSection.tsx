import Link from 'next/link';
import Image from 'next/image';
import mainMap from '../../../public/images/mainMap.png';

const MainMapSection = () => {
  return (
    <section className="pc-inner-width mt-7 lg:mt-2 mo-only:px-6">
      <Link href={'/stamp-map'}>
        <div className="relative h-[350px] w-full cursor-pointer overflow-hidden rounded-3xl bg-[#1D1D1D]">
          <Image src={mainMap} fill alt="지도" priority style={{ objectFit: 'cover' }} />
          <div className="absolute left-0 top-0 h-full w-full bg-[#1d1d1d]/70"></div>
          <div className="absolute bottom-0 left-0 mb-8 ml-6 lg:mb-[46px] lg:ml-[60px]">
            <div className="block lg:hidden">
              <p className="font-bold text-4xl leading-[46.80px] text-white">
                지도로 보는
                <br /> 나의 여행 기록
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="font-bold text-4xl leading-[46.80px] text-white">지도로 보는 나의 여행 기록</p>
              <p className="mt-1 text-base leading-normal text-white">
                지금까지 모아와 함께한 발자취를 지도로 돌아볼 수 있어요.
              </p>
              <div className="mt-2 inline-flex h-9 items-center justify-center gap-2.5 rounded-[14px] border border-white px-4 py-2">
                <p className="text-sm leading-tight text-white">여행기록 보기</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default MainMapSection;
