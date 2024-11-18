import { QUERY_KEY } from '@/hooks/queries/query.keys';
import { postAlbum } from '@/services/apis/photoAlbum';
import { deleteAlbum } from '@/services/apis/photoAlbum';
import { useQueryClient, useMutation } from '@tanstack/react-query';

// 앨범 추가
export const usePostAlbumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ALBUM });
    },
    onError: (error) => {
      console.error('MutationError:', error);
    }
  });
};

// 앨범 삭제
export const useDeleteAlbumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ALBUM });
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    }
  });
};
