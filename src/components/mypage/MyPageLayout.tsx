'use client';
import Link from 'next/link';
import useProfile from './ProfileManager';
import StampNum from './StampNum';

const MyPageLayout = () => {
  const { nickname } = useProfile(); // 프로필 정보와 로그아웃 기능 가져오기

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
            <p>나의 발자취</p>
          </div>
          <div className="row-span-2 flex h-52 items-center justify-center rounded-2xl bg-gray-300 p-6">
            <p>내가 찜한 여행지</p>
          </div>
          <div className="flex h-24 items-center justify-center rounded-2xl bg-gray-300 p-6">
            <p> 나의 추억들</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
