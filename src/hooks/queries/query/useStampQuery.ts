import { Stamp } from '@/types/supabase/table.type';
import { QUERY_KEY } from '../query.keys';
import { getStampList } from '@/services/serverActions/stamp';
import { getStampLocation } from '@/services/apis/stamp';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// 스탬프 리스트 쿼리
export const useGetStampListQuery = (userId: string): UseQueryResult<Stamp[]> => {
  return useQuery({
    queryKey: QUERY_KEY.STAMP_LIST(userId),
    queryFn: () => getStampList(userId),
    enabled: !!userId // userId가 있을 때만 쿼리 실행
  });
};

// 사용자의 스템프 항목 중 현재위치 주소가 일치하는 데이터 가져오기
export const useGetStampLocationQuery = (address: string | undefined, userId: string): UseQueryResult<Stamp[]> => {
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
