import { useRouter } from 'next/navigation';
import { PAGE_NAMES } from '@/constants/pageName';

import Button from '@/components/common/Buttons/Button';
import ArrowIcon from '@/components/common/Icons/LandingIcons/ArrowIcon';
import CameraIcon from '@/components/common/Icons/LandingIcons/CameraIcon';
import CompassIcon from '@/components/common/Icons/LandingIcons/CompassIcon';

interface LandingPageProps {
  isLoggedIn: boolean;
}

export const LandingStart = ({ isLoggedIn }: LandingPageProps) => {
  const router = useRouter();

  //pc - 단하나 텍스트 통통 애니메이션
  const text1 = '단';
  const text2 = '하나의';
  const animatedText1 = text1.split('').map((char, index) => (
    <span key={index} className="bounce">
      {char}
    </span>
  ));
  const animatedText2 = text2.split('').map((char, index) => (
    <span key={index} className="bounce bounce2">
      {char}
    </span>
  ));

  // 리다이렉트 버튼
  const goToLoginOrHome = () => {
    if (isLoggedIn) {
      router.push(PAGE_NAMES.HOME.link); // 로그인 상태일 때 홈으로 이동
    } else {
      router.push(PAGE_NAMES.LOGIN.link); // 비로그인 상태일 때 로그인 페이지로 이동
    }
  };

  return (
    <section className="flex flex-col items-center justify-between overflow-hidden lg:h-full lg:gap-[38px] lg:border-b lg:border-[#828282] lg:bg-white lg:pb-[15%] lg:pt-[10%] mo-only:relative mo-only:min-h-[calc(100vh-8rem)]">
      <div className="flex w-full flex-grow items-center justify-center lg:relative lg:min-h-[70vh]">
        <div className="absolute h-[30%]">
          <CameraIcon />
        </div>
        <div className="absolute h-[50%]">
          <CompassIcon />
        </div>
        <div className="absolute h-[60%]">
          <ArrowIcon />
        </div>
      </div>
      <div className="hidden flex-col items-center gap-[16px] lg:flex">
        <h2 className={`sectionTitle-Black`}>
          모아는 당신을 위한{' '}
          <strong className="text-[#008EBD]">
            {animatedText1} {animatedText2} 여행기
          </strong>{' '}
          입니다.
        </h2>
        <span className="text-gray-900">내 손안에 여행기 모아와 함께 여행을 떠나요.</span>
      </div>
      <div className="flex w-full flex-col items-center justify-center px-6 lg:mb-[50px]">
        <Button text="여행 떠나기" variant="blue" onClick={goToLoginOrHome} />
      </div>
    </section>
  );
};
