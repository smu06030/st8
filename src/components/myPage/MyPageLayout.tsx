'use client';
import Link from 'next/link';
import useProfile from './ProfileManager';
import StampNum from './StampNum';

const MyPageLayout = () => {
  const { nickname, error } = useProfile(); // 프로필 정보와 로그아웃 기능 가져오기

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center p-6">
      <div className="flex items-start space-x-4">
        <h1 className="text-xl font-bold"> {nickname ? nickname : 'guest'}님</h1>
        <Link href="/profile">
          <h6 className="text-defaultcolor cursor-pointer">수정하기</h6>
        </Link>
      </div>

      <div>
        <h6 className="mb-4 font-bold">내 정보</h6>

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
