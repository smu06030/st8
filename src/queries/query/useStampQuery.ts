import { getStampList, getStampLocation } from '@/serverActions/stampActions';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../query.keys';

// 스탬프 리스트 가져오기
export const useGetStampListQuery = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEY.STAMPLIST(userId),
    queryFn: () => getStampList(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
    refetchOnWindowFocus: true
  });
};

// 사용자의 스템프 항목 중 현재위치 주소가 일치하는 데이터 가져오기
export const useGetStampLocationQuery = (address: string | undefined, userId: string) => {
  return useQuery({
    queryKey: QUERY_KEY.USER_LOCATION_STAMP,
    queryFn: async () => {
      if (address) {
        return await getStampLocation(address, userId);
      } else return null;
    },
    enabled: !!userId
  });
};
