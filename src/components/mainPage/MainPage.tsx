import Image from 'next/image';
import mainMap from '../../../public/images/mainMap.png';
import ArrowIcon from '@/components/common/Icons/ArrowIcon';
import Link from 'next/link';

const MainPage = () => {
  return (
    <main className="p-6">
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
      <section className="mt-8">
        <div className="flex flex-col items-start justify-start gap-1.5">
          <Link href={'/stamp-all'}>
            <div className="flex items-center justify-start gap-1">
              <p className="font-semiBold text-2xl leading-[31.20px] text-gray-900">스탬프</p>
              <div className="flex h-7 w-7 items-center justify-center p-1">
                <ArrowIcon />
              </div>
            </div>
          </Link>
          <p className="text-sm leading-tight text-gray-600">지금까지 모은 스탬프들을 확인 할 수 있어요.</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-[15px]">
          <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
          <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
          <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
          <div className="h-40 w-full rounded-3xl bg-[#071325]"></div>
        </div>
      </section>
      <section className="my-6">
        <div className="font-semiBold text-xl text-[#848484]">사랑하는 사람과 함께</div>
      </section>
    </main>
  );
};
export default MainPage;
