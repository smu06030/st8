import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBookmarkStatus } from '@/apis/bookmark';
import { QUERY_KEY } from '../query.keys';

// 좋아요 상태 업데이트
export const useBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBookmarkStatus,

    // 낙관적 업데이트: mutation이 시작되면 즉시 캐시 상태를 변경
    onMutate: async ({ userId, isBookmarked }) => {
      // 기존 캐시 값 취소 및 롤백을 위해 백업
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.BOOKMARK(userId) });

      const previousData = queryClient.getQueryData(QUERY_KEY.BOOKMARK(userId));

      // 캐시에 낙관적 업데이트 적용
      queryClient.setQueryData(QUERY_KEY.BOOKMARK(userId), (oldData: any) => ({
        ...oldData,
        isBookmarked: !isBookmarked
      }));

      return { previousData, userId };
    },

    // 오류 발생 시 롤백
    onError: (error, isBookmarked, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEY.BOOKMARK(context.userId), context.previousData);
      }
      console.error('북마크 업데이트 오류:', error);
    },

    // 성공 또는 실패 후 캐시를 최신 상태로 갱신
    onSettled: (data, error, variables, context) => {
      if (context?.userId) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.BOOKMARK(context.userId) });
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.TOURISM_LIST });

        queryClient.refetchQueries({ queryKey: QUERY_KEY.BOOKMARK(context.userId) });
        queryClient.refetchQueries({ queryKey: QUERY_KEY.TOURISM_LIST });
      }
    }
  });
};
