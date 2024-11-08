import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import { postStamp } from '@/apis/stamp';

//useMutation(추가)
export const usePostStampMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStamp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.USER_LOCATION_STAMP });
    }
  });
};
