'use server';

import { createClient } from '@/utils/supabase/server';
//앨범전체데이터 가져오기
export const getAlbumList = async (userId: string) => {
  const serverClient = createClient();

  const { data, error } = await serverClient.from('album').select('*').eq('user_id', userId);

  if (error) {
    console.error('포토앨범 리스트 가져오기 오류 :', error.message);
    throw new Error('포토앨범 리스트 데이터를 가져오는 중 오류가 발생했습니다.' + error.message);
  }
  return data;
};
