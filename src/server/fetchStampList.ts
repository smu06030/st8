import browserClient from '@/utils/supabase/client';
const userId = '05a65b78-a87c-49b4-b8e1-e5b80e263e43'; //임시 로그인유저

//로그인유저의 스템프 항목 전부 가져오기
export const fetchStampList = async () => {
  const { data: nowStampList, error } = await browserClient
    .from('stamp')
    .select('*')
    .eq('user_id', userId)
    .eq('region', '서울특별시');
  if (error) console.error('가져오기 오류:', error.message);
  console.log('nowStampList', nowStampList);
  return nowStampList;
};

//로그인유저의 스템프 항목 전부 가져오기
// export const fetchStampList = async () => {
//   const { data: stampList, error } = await browserClient.from('stamp').select('*').eq('user_id', userId);
//   if (error) console.error('가져오기 오류:', error.message);
//   return stampList;
// };
