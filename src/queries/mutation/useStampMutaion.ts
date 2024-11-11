import { useQueryClient, useMutation } from '@tanstack/react-query';
import { patchLocationAlias } from '@/serverActions/stamp';
import { QUERY_KEY } from '@/queries/query.keys';
import { postStamp } from '@/apis/stamp';
import { deleteStamp } from '@/apis/stamp';
import { Stamp } from '@/types/supabase/table.type';

interface PatchAliasPropsType {
  alias: string;
  userId: string;
  address: string;
}

// 현재위치 스탬프 추가
export const usePostStampMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStamp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.USER_LOCATION_STAMP });
    }
  });
};

// 현재위치 스탬프 삭제
export const useDeleteStampMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStamp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.USER_LOCATION_STAMP });
    }
  });
};

// 스탬프 별칭 추가
export const usePostAliasMutation = () => {
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
