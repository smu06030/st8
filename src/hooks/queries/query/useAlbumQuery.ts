import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/hooks/queries/query.keys';
import { getAlbumList } from '@/services/apis/photoAlbum';

//useQuery - 앨범전체데이터
export const useGetAlbumListQuery = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEY.ALBUM,
    queryFn: async () => {
      if (userId) {
        return await getAlbumList(userId);
      } else {
        return null;
      }
    },
    enabled: !!userId
  });
};
