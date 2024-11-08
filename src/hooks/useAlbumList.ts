import { fetchAlbum, addAlbumList, deleteAlbumList } from '@/apis/fetchAlbumList';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//useQuery - 앨범전체데이터
export const useAlbumList = (userId: string) => {
  return useQuery({
    queryKey: ['photo'],
    queryFn: async () => {
      if (userId) {
        return await fetchAlbum(userId);
      } else {
        return null;
      }
    },
    enabled: !!userId
  });
};

//useMutation(추가)
export const useAlbumAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAlbumList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    },
    onError: (error) => {
      console.error('MutationError:', error);
    }
  });
};

export const useAlbumDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAlbumList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    },
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
    }
  });
};