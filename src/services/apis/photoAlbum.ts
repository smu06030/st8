import browserClient from '@/utils/supabase/client';

interface AddAlbumListParams {
  imgs: string[];
  regionCate: string;
}

//앨범전체데이터 가져오기
export const getAlbumList = async (userId: string) => {
  const { data, error } = await browserClient.from('album').select('*').eq('user_id', userId);

  if (error) {
    console.error('포토앨범 리스트 가져오기 오류 :', error.message);
    throw new Error('포토앨범 리스트 데이터를 가져오는 중 오류가 발생했습니다.' + error.message);
  }
  return data;
};

// 수파베이스에 값 추가(이미지url,지역이름)
export const postAlbum = async ({ imgs, regionCate }: AddAlbumListParams) => {
  const { data, error } = await browserClient.from('album').insert({
    photoImg: imgs,
    region: regionCate
  });
  if (error) {
    console.error('포토앨범 추가하기 오류 :', error.message);
    throw new Error('포토앨범 추가 중 오류가 발생했습니다.' + error.message);
  }
  return data;
};

//삭제뮤테이션 재료 : 서버 지정아이디 삭제함수
export const deleteAlbum = async (deleteId: number[]) => {
  console.log('deleteId', deleteId[0]);

  const { data, error } = await browserClient.from('album').delete().in('id', deleteId);
  if (error) {
    console.error('앨범 삭제중 오류 발생:', error);
    throw new Error('앨범 삭제하는 중 오류가 발생했습니다.' + error.message);
  }
  return data;
};
