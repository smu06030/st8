import { patchLocationAlias } from '@/serverActions/stampActions';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '../query.keys';

interface PatchAliasPropsType {
  alias: string;
  userId: string;
  address: string;
}

// 스탬프 별칭 바꾸기
export const usePatchAliasMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ alias, userId, address }: PatchAliasPropsType) => {
      return await patchLocationAlias(alias, userId, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.USER_LOCATION_STAMP });
    }
  });
};
