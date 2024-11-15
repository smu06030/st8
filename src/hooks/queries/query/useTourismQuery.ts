import { Tourism } from '@/types/tourism/tourism.type';
import { QUERY_KEY } from '../query.keys';
import { getTourismList } from '@/services/apis/tourism';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// 추천 여행지 리스트 쿼리
export const useGetTourismListQuery = (userId: string): UseQueryResult<Tourism[]> => {
  return useQuery({
    queryKey: QUERY_KEY.TOURISM_LIST(userId),
    queryFn: () => getTourismList(userId)
    // enabled: !!userId
  });
};
