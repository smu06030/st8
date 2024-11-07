import { fetchActiveStamp } from '@/serverActions/fetchStampActions';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from './query.keys';

// 스탬프 active 리스트 가져오기
const useGetStampActive = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEY.STAMPLIST(userId),
    queryFn: () => fetchActiveStamp(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
    refetchOnWindowFocus: true
  });
};

const useQuerys = {
  useGetStampActive
};

export default useQuerys;
