import KakaoMap from '@/components/stampMap/KakaoMap';
import { getStampList } from '@/serverActions/stamp';
import { getUser } from '@/serverActions/user';
import { MapProvider } from '@/providers/mapStoreProvider';
import { QUERY_KEY } from '@/queries/query.keys';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: '홈에 있는 스탬프 맵 페이지 입니다.'
};

const StampMapPage = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000
      }
    }
  });

  const user = await getUser();

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEY.STAMP_LIST(user.id),
      queryFn: () => getStampList(user.id)
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MapProvider>
        <KakaoMap />
      </MapProvider>
    </HydrationBoundary>
  );
};

export default StampMapPage;
