import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import { postStamp } from '@/apis/stamp';

interface PostStampPropsType {
  address: string;
  region: string;
  userId: string;
  location: { lat: number; lng: number };
  aliasLocation: string | null;
}

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
