import { Metadata } from 'next';

import MyPageLayout from '@/components/mypage/MyPageLayout';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '마이 페이지입니다.'
};

const MyPage = () => {
  return (
    <div className="mt-12 block lg:hidden">
      <MyPageLayout />
    </div>
  );
};

export default MyPage;
