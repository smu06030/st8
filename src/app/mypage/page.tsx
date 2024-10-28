import { Metadata } from 'next';
import MyPageLayout from '../../components/mypage/MyPageLayout';
import MyInfo from '@/components/mypage/MyInfo';

export const metadata: Metadata = {
  title: '마이 페이지',
  description: '마이 페이지입니다.'
};

const MyPage = () => {
  return (
    <div>
      <MyPageLayout />
      <MyInfo />
    </div>
  );
};

export default MyPage;
