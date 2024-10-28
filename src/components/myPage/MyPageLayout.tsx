'use client';
import useProfile from './ProfileManager';

const MyPageLayout = () => {
  const { nickname, error, onHandleLogout } = useProfile(); // 프로필 정보와 로그아웃 기능 가져오기

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center p-10">
      <div className="flex items-start space-x-4">
        <h1 className="text-xl font-bold">{nickname ? nickname : 'guest'}님</h1>
        <h6 className="text-defaultcolor cursor-pointer">수정하기</h6>
      </div>

      <div className="mt-2 flex items-start space-x-4">
        <p>최근 여행지</p>
        <p>과거의 오늘</p>
      </div>

      <button onClick={onHandleLogout} className="mt-4">
        로그아웃
      </button>
    </div>
  );
};

export default MyPageLayout;
