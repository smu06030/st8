import { QUERY_KEY } from '@/hooks/queries/query.keys';
import { postAlbum } from '@/services/apis/photoAlbum';
import { deleteAlbum } from '@/services/apis/photoAlbum';
import { useQueryClient, useMutation } from '@tanstack/react-query';

// 앨범 추가 : 낙관적 업데이트
export const usePostAlbumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAlbum,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.ALBUM });
      // 활성쿼리 취소
      const previousAlbums = queryClient.getQueryData(QUERY_KEY.ALBUM);
      //이전 앨범정보 가져오기(에러발생시 롤백용)
      queryClient.setQueryData(QUERY_KEY.ALBUM, (old: any) => [...old, newData]);
      //UI를 먼저 업데이트, 실패시 데이터복원(첫번째인자:업뎃할 쿼리키, 두번째인자:업데이트함수로 old현재+new추가할꺼)
      return { previousAlbums };
    },
    onError: (error, newAlbum, context) => {
      queryClient.setQueryData(QUERY_KEY.ALBUM, context?.previousAlbums);
      // 에러발생시 데이터복원
      console.error('MutationError:', error);
    },
    onSuccess: () => {
      console.log('앨범이 성공적으로 추가되었습니다.');
    },
    onSettled: () => {
      //성공실패 상관없이 호출
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ALBUM });
    }
  });
};

// 앨범 삭제 : 낙관적 업데이트
export const useDeleteAlbumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAlbum,
    onMutate: async (albumId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.ALBUM });
      // 활성쿼리 취소
      const previousAlbums = queryClient.getQueryData(QUERY_KEY.ALBUM);
      //이전 앨범정보 가져오기(에러발생시 롤백용)
      queryClient.setQueryData(QUERY_KEY.ALBUM, (old: any) => old.filter((photo: any) => photo.id !== albumId));
      //UI를 먼저 업데이트, 실패시 데이터복원(첫번째인자:업뎃할 쿼리키, 두번째인자:이전데이터 아이디기준 필터링)
      return { previousAlbums };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ALBUM });
    },
    onError: (error, albumId, context) => {
      queryClient.setQueryData(QUERY_KEY.ALBUM, context?.previousAlbums);
      console.error('삭제 중 오류 발생:', error);
    },
    onSettled: () => {
      //성공실패 상관없이 호출
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ALBUM });
    }
  });
};
