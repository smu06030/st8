import { Metadata } from 'next';
import MyPageLayout from '../../components/myPage/MyPageLayout';

export const metadata: Metadata = {
  title: '마이 페이지',
  description: '마이 페이지입니다.'
};

const MyPage = () => {
  return <MyPageLayout />;
};

export default MyPage;
