import Image from 'next/image';
import map from '../../../public/images/map.png';

const MainPage = () => {
  return (
    <main className="p-6">
      <section className="my-6">
        <div className="mb-5 font-semiBold text-xl text-[#848484]">지도</div>
        <div>
          <Image src={map} width={100} height={100} alt="지도" priority />
        </div>
      </section>
      <section className="my-6">
        <div className="font-semiBold text-xl text-[#848484]">스탬프</div>
      </section>
      <section className="my-6">
        <div className="font-semiBold text-xl text-[#848484]">사랑하는 사람과 함께</div>
      </section>
    </main>
  );
};
export default MainPage;
