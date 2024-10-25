import browserClient from '@/utils/supabase/client';
const userId = '05a65b78-a87c-49b4-b8e1-e5b80e263e43'; //임시 로그인유저

//로그인유저의 스템프 항목 중 현재위치 주소가 일치한거만 패치
export const fetchStampList = async (address: string) => {
  const { data: nowStampList, error } = await browserClient
    .from('stamp')
    .select('*')
    .eq('user_id', userId)
    .eq('address', address);
  if (error) console.error('가져오기 오류:', error.message);
  return nowStampList;
};
