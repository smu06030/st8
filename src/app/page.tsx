import MainMapSection from '@/components/mainPage/MainMapSection';
import MainFooter from '@/components/mainPage/MainFooter';
import MainRecommendSection from '@/components/mainPage/MainRecommendSection';
import MainStampSection from '@/components/mainPage/MainStampSection';
import Header from '@/components/common/header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: '홈페이지 입니다.'
};

const MainHomePage = () => {
  return (
    <>
      <Header title={String(metadata.title)} />
      <main className="relative p-6">
        <MainMapSection />
        <MainStampSection />
        <MainRecommendSection />
        <MainFooter />
      </main>
    </>
  );
};

export default MainHomePage;
