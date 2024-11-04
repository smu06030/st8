import Link from 'next/link';
import Image from 'next/image';
import mainMap from '../../../public/images/mainMap.png';

const MainMapSection = () => {
  return (
    <section className="mt-7">
      <Link href={'/stamp-map'}>
        <div className="relative h-[350px] w-full cursor-pointer overflow-hidden rounded-3xl">
          <Image src={mainMap} fill alt="지도" priority style={{ objectFit: 'cover' }} />
          <div className="absolute bottom-0 left-0 mb-8 ml-6 font-bold text-4xl leading-[46.80px] text-white">
            <p className="block lg:hidden">
              지도로 보는
              <br /> 나의 여행 기록
            </p>
            <p className="hidden lg:block">지도로 보는 나의 여행 기록</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default MainMapSection;
