import { Metadata } from 'next';

import MainFooter from '@/components/mainPage/MainFooter';
import MainMapSection from '@/components/mainPage/MainMapSection';
import MainStampSection from '@/components/mainPage/MainStampSection';
import MainRecommendSection from '@/components/mainPage/MainRecommendSection';
import RecentPhoto from '@/components/mypage/MyPageRecentPhoto';

export const metadata: Metadata = {
  title: '홈',
  description: '홈 페이지 입니다.'
};

const MainHomePage = () => {
  return (
    <main className="lg:mt-18 relative mt-20">
      <MainMapSection />
      <MainStampSection />
      <MainRecommendSection />
      <RecentPhoto limit={6} containerStyle="hidden lg:block" />
      <MainFooter />
    </main>
  );
};

export default MainHomePage;
