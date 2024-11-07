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

// // 사용자의 스템프 항목 중 현재위치 주소가 일치하는 데이터 가져오기
// const useGetLocationStampActive = (address: string | undefined, userId: string) => {
//   return useQuery({
//     queryKey: QUERY_KEY.NOWLOCATION_STAMP,
//     queryFn: async () => {
//       if (address) {
//         return await fetchLocationStamp(address, userId);
//       } else return null;
//     },
//     enabled: !!userId && !!address,
//     refetchOnWindowFocus: true,
//     staleTime: 0
//   });
// };

const useQuerys = {
  useGetStampActive
  // useGetLocationStampActive
};

export default useQuerys;
