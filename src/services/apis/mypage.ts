import browserClient from '@/utils/supabase/client';

// 마이페이지에서 앨범 갯수 가져오는 로직
export const getPhotoCount = async (userId: string): Promise<number> => {
  const { count, error } = await browserClient.from('album').select('*', { count: 'exact' }).eq('user_id', userId);

  if (error) {
    console.error('사진 개수를 불러오는 중 오류:', error);
    throw new Error('Failed to fetch photo count');
  }

  return count || 0;
};

// 마이페이지에서 스탬프 갯수 가져오는 로직
export const getStampCount = async (userId: string) => {
  const { count, error } = await browserClient.from('stamp').select('*', { count: 'exact' }).eq('user_id', userId);

  if (error) {
    throw new Error('stamp count를 불러오는데 실패');
  }

  return count || 0;
};
