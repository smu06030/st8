import MainMapSection from '@/components/mainPage/MainMapSection';
import MainFooter from '@/components/mainPage/MainFooter';
import MainRecommendSection from '@/components/mainPage/MainRecommendSection';
import MainStampSection from '@/components/mainPage/MainStampSection';
import { Metadata } from 'next';

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
      <MainFooter />
    </main>
  );
};

export default MainHomePage;
