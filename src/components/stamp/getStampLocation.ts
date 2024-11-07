import browserClient from '@/utils/supabase/client';
import useUser from '@/hooks/useUser';

export const getStampLocation = async (address: string) => {
  const userId = useUser();
  const { data: userLocationStamp, error } = await browserClient
    .from('stamp')
    .select('*')
    .eq('user_id', userId)
    .eq('address', address);

  if (error) {
    console.error('위치 기반 스탬프 리스트 가져오기 오류 :', error.message);
    throw new Error('위치 기반 스탬프 리스트 데이터를 가져오는 중 오류가 발생했습니다.' + error.message);
  }
  return userLocationStamp;
};
