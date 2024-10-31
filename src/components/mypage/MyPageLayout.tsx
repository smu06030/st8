'use client';
import Link from 'next/link';

import StampNum from './StampNum';
import useUserNickname from '@/hooks/useUserNickname';

const MyPageLayout = () => {
  const { nickname, error } = useUserNickname();

  return (
    <div className="flex flex-col items-start justify-center p-6">
      <div className="flex items-start space-x-4">
        <h1 className="font-bold text-xl"> {nickname ? nickname : 'guest'}님</h1>
        <Link href="/profile">
          <h6 className="cursor-pointer text-gray-500">수정하기</h6>
        </Link>
      </div>
      <div className="my-4 flex items-start space-x-4">
        <p>최근 여행지</p>
        <p>과거의 오늘</p>
      </div>
      <div>
        <h6 className="mt-2">내 정보</h6>
        <StampNum />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex h-24 items-center justify-center rounded-2xl bg-gray-300 p-6">
            <Link href="/stamp-map" className="flex h-full w-full items-center justify-center">
              <p>나의 발자취</p>
            </Link>
          </div>
          <div className="row-span-2 flex h-52 items-center justify-center rounded-2xl bg-gray-300 p-6">
            <Link href="/tourism" className="flex h-full w-full items-center justify-center">
              <p>내가 찜한 여행지</p>
            </Link>
          </div>
          <div className="flex h-24 items-center justify-center rounded-2xl bg-gray-300 p-6">
            <Link href="/photo-album" className="flex h-full w-full items-center justify-center">
              <p>나의 추억들</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;