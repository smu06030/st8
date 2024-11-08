import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/queries/query.keys';
import { deleteAlbum } from '@/apis/photoAlbum';

// 앨범 삭제
export const useDeleteAlbumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.Album });
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    }
  });
};
