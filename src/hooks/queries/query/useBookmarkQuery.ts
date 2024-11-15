import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../query.keys';
import { getBookmarkList } from '@/services/apis/bookmark';

// 북마크 여행지 정보 쿼리
export const useGetBookmarkListQuery = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEY.BOOKMARK(userId),
    queryFn: () => getBookmarkList(userId),
    enabled: !!userId
  });
};
