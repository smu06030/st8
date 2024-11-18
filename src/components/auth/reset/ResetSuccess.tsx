'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Buttons/Button';
import CompassIcon from '@/components/common/Icons/LandingIcons/CompassIcon';

const ResetSuccess = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-between overflow-hidden">
      <div className="mt-24 flex w-full flex-grow items-center justify-center">
        <div className="absolute flex h-[80%] justify-center">
          <CompassIcon />
        </div>
        <span className="flex flex-col items-center font-semiBold text-2xl">
          이메일을 확인해주세요!
          <p className="mt-3 text-center font-regular text-base">
            등록된 이메일로 비밀번호 <br />
            변경 링크를 보내드렸습니다.
          </p>
        </span>
      </div>

      <div className="mb-[50px] flex w-full flex-col items-center justify-center px-6">
        <Button text="로그인 화면으로" variant="blue" onClick={goToLogin} />
      </div>
    </div>
  );
};

export default ResetSuccess;
