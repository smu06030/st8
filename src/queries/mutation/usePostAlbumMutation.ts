import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import { postAlbum } from '@/apis/photoAlbum';

// 앨범 추가
export const usePostAlbumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.Album });
    },
    onError: (error) => {
      console.error('MutationError:', error);
    }
  });
};
