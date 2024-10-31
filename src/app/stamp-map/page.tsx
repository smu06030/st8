import KakaoMap from '@/components/stampMap/KakaoMap';
import { MapProvider } from '@/providers/mapStoreProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스탬프 맵 페이지',
  description: '스탬프 맵 페이지 입니다.'
};

const StampMapPage = () => {
  return (
    <MapProvider>
      <KakaoMap />
    </MapProvider>
  );
};

export default StampMapPage;
