import { Metadata } from 'next';

import KakaoMap from '@/components/stampMap/KakaoMap';

export const metadata: Metadata = {
  title: '지도',
  description: '지도 페이지 입니다.'
};

const StampMapPage = () => {
  return <KakaoMap />;
};

export default StampMapPage;
