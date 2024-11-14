import { getAlbumList } from '@/apis/photoAlbum';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';

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
