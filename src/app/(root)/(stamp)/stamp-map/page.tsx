import { getUser } from '@/services/serverActions/user';
import { Metadata } from 'next';
import { QUERY_KEY } from '@/hooks/queries/query.keys';
import { MapProvider } from '@/providers/mapStoreProvider';
import { getStampList } from '@/services/serverActions/stamp';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import KakaoMap from '@/components/stampMap/KakaoMap';

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
