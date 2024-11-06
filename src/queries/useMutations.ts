import { fatchLocationAlias } from '@/serverActions/fetchStampActions';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from './query.keys';

interface PatchAliasType {
  alias: string;
  userId: string;
  address: string;
}

const usePatchAlias = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ alias, userId, address }: PatchAliasType) => {
      return await fatchLocationAlias(alias, userId, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowStamp'] });
    }
  });
};

const useMutations = {
  usePatchAlias
};

export default useMutations;
