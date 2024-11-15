'use client';

import Link from 'next/link';
import Image from 'next/image';
import StampCount from './StampCount';
import PhotoCount from './PhotoCount';
import RecentPhoto from './RecentPhoto';
<<<<<<< HEAD
=======
import LogoutButton from '../auth/LogoutButton';
import NicknameEditor from './NicknameEditor';
>>>>>>> 95bc91edf7e308185a2e874729485f8acd62a585

const MyPageLayout = () => {
  // useEffect(() => {
  //   throw new Error('에러');
  // }, []);

  return (
    <div className="items-left mx-auto flex h-full max-w-[600px] flex-col bg-white px-6 pb-24">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-4">
          <NicknameEditor />
        </div>
        <LogoutButton />
      </div>
      <RecentPhoto />
      <div>
        <h6 className="mb-[18px] mt-[20px] font-bold text-[20px] text-gray-900">내 정보</h6>
        <StampCount />
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex h-[156px] flex-col justify-center rounded-2xl bg-primary-400 p-6 text-black">
            <Link href="/stamp-map" className="flex h-full w-full flex-col">
              <p className="font-semiBold text-[12px]">지도로 보는 나의 여정</p>
              <p className="mt-1 font-regular text-xs">
                내 여정을
                <br />
                지도로 한눈에
              </p>
              <p className="mt-4 font-bold text-lg">나의 발자취</p>
            </Link>
          </div>

          <div className="relative row-span-2 flex h-[327px] items-center justify-center overflow-hidden rounded-2xl">
            <Image src="/images/mypage_img2.png" alt="배경 이미지" fill style={{ objectFit: 'cover' }} priority />
            <div className="absolute inset-0 bg-[#081425]/70"></div>
            <Link href="/book-mark" className="relative flex h-full w-full flex-col items-end justify-end p-6">
              <p className="mb-4 text-right font-bold text-[20px] leading-tight text-white">
                내가 찜한 <br />
                여행지
              </p>
            </Link>
          </div>
          <PhotoCount />
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
