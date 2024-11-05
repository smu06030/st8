'use client';
import Link from 'next/link';
import StampNum from './StampNum';
import useUserNickname from '@/hooks/useUserNickname';
import ReNickname from './ReNickname';
import LogoutButton from '../auth/LogoutButton';
import PhotoNum from './PhotoNum';

const MyPageLayout = () => {
  return (
    <div className="items-left flex min-h-[100vh] flex-col bg-white px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-4">
          <ReNickname />
        </div>
        <LogoutButton />
      </div>
      <div className="my-4 flex items-start space-x-4">
        <p>최근 여행지</p>
        <p>과거의 오늘</p>
      </div>
      <div>
        <h6 className="mb-[18px] mt-[38px] font-bold text-[20px]">내 정보</h6>
        <StampNum />
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex h-[156px] flex-col justify-center rounded-2xl bg-primary-400 p-6 text-black">
            <Link href="/stamp-map" className="flex h-full w-full flex-col">
              <p className="text-[12px] font-semibold">지도로 보는 나의 여정</p>
              <p className="mt-1 text-[12px]">
                내 여정을
                <br />
                지도로 한눈에
              </p>
              <p className="mt-4 font-bold text-[18px]">나의 발자취</p>
            </Link>
          </div>

          <div className="row-span-2 flex h-[327px] items-center justify-center rounded-2xl bg-gray-300 p-6">
            <Link href="/tourism" className="relative flex h-full w-full items-end justify-end">
              <p className="text-[20px]leading-tight mb-4 text-right font-bold text-white">
                내가 찜한 <br />
                여행지
              </p>
            </Link>
          </div>
          <PhotoNum />
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
