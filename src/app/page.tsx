import MainMapSection from '@/components/mainPage/MainMapSection';
import MainFooter from '@/components/mainPage/MainFooter';
import MainRecommendSection from '@/components/mainPage/MainRecommendSection';
import MainStampSection from '@/components/mainPage/MainStampSection';

const MainHomePage = () => {
  return (
    <main className="relative p-6">
      <MainMapSection />
      <MainStampSection />
      <MainRecommendSection />
      <MainFooter />
    </main>
  );
};

export default MainHomePage;
