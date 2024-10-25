'use client';
import useProfile from './ProfileManager';

const MyPageLayout = () => {
  const { nickname, error, onHandleLogout } = useProfile(); // 프로필 정보와 로그아웃 기능 가져오기

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>마이페이지</h1>
      <h3>닉네임: {nickname ? nickname : 'guest'}</h3>
      <button onClick={onHandleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPageLayout;

//마이페이지에 들어갈 다양한 레이아웃 추가 예정
