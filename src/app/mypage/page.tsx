import Header from '@/components/common/header/Header';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '마이 페이지입니다.'
};

const MyPage = () => {
  return (
    <div>
      <Header title={String(metadata.title)} />
      <MyPageLayout />
    </div>
  );
};

export default MyPage;
