import browserClient from '@/utils/supabase/client';

//앨범전체테이블
export const fetchAlbum = async () => {
  const { data, error } = await browserClient.from('album').select('*');

  if (error) {
    console.error('가져오기 오류4:', error.message);
  }
  // console.log('data', data);
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
