import { getUser } from '@/services/serverActions/user';
import { Metadata } from 'next';
import { QUERY_KEY } from '@/hooks/queries/query.keys';
import { MapProvider } from '@/providers/mapStoreProvider';
import { getStampList } from '@/services/serverActions/stamp';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: '스탬프',
  description: '스탬프 관련 페이지 입니다.'
};

/**
 * 서버에서 미리 스탬프 리스트를 미리 패치
 * 서버 -> 클라이언트로 데이터를 전달하려면 dehydrate를 사용해 직렬화(JSON 형식)된 형태로 변환
 * 클라이언트측에서 HydrationBoundary를 사용해 전달받은 데이터를 복원해서 사용
 */

export default async function StampLayout({ children }: { children: React.ReactNode }) {
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
      <MapProvider>{children}</MapProvider>
    </HydrationBoundary>
  );
}
