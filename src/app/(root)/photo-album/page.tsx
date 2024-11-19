import { Metadata } from 'next';
import { getUser } from '@/services/serverActions/user';
import { QUERY_KEY } from '@/hooks/queries/query.keys';
import AlbumList from '@/components/photoalbum/AlbumList';
import { getAlbumList } from '@/services/serverActions/photoAlbum';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: '앨범',
  description: '앨범 페이지입니다.'
};

const Album = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000
      }
    }
  });

  const user = await getUser();
  //프리패치
  if (user) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEY.ALBUM,
      queryFn: () => getAlbumList(user.id)
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="lg:pt-[64px]">
        <AlbumList />
      </div>
    </HydrationBoundary>
  );
};

export default Album;
