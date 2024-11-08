import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import { deleteStamp } from '@/apis/stamp';

//useMutation(삭제)
export const useDeleteStampMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStamp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.USER_LOCATION_STAMP });
    }
  });
};
