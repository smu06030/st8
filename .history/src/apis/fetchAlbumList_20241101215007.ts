import browserClient from '@/utils/supabase/client';

//앨범전체테이블
export const fetchAlbum = async () => {
  const { data, error } = await browserClient.from('album').select('*');
  if (error) console.error('가져오기 오류4:', error.message);
  return data;
};

interface AddAlbumListParams {
  imgs: string[];
  regionCate: string;
}

//뮤테이션 함수 : 수파베이스에 값 추가(이미지url,지역이름)
export const addAlbumList = async ({ imgs, regionCate }: AddAlbumListParams) => {
  const { data, error } = await browserClient.from('album').insert({
    photoImg: imgs,
    region: regionCate
  });
  if (error) console.log('error', error);
  return data;
};

//삭제뮤테이션 재료 : 서버 지정아이디 삭제함수
export const deleteAlbumList = async (deleteId: number[]) => {
  try {
    console.log('deleteId', deleteId[0]); //[id1, id2]

    const { data, error } = await browserClient.from('album').delete().in('id', deleteId);
    if (error) console.error('삭제중 오류 발생:', error);
    else {
      console.log('삭제성공', data);
    }
  } catch (error) {
    console.error('예상치 못한 오류 발생:', error);
  }
};
