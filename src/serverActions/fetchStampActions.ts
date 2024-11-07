'use server';

import { createClient } from '@/utils/supabase/server';

// 로그인유저의 스템프 항목 전부 + 스탬프 활성화된 데이터만
export const fetchActiveStamp = async (userId: string) => {
  const serverClient = createClient();

  const { data, error } = await serverClient.from('stamp').select('*').eq('user_id', userId).eq('visited', true);

  if (error) {
    console.error('스탬프 정보 가져오기 오류 :', error.message);
    throw new Error('스탬프 데이터를 가져오는 중 오류가 발생했습니다.' + error.message);
  }

  return data;
};

// //로그인유저의 스템프 항목 중 현재위치 주소가 일치한거만 패치
// export const fetchLocationStamp = async (address: string, userId: string) => {
//   const serverClient = createClient();

//   const { data: nowStampList, error } = await serverClient
//     .from('stamp')
//     .select('*')
//     .eq('user_id', userId)
//     .eq('address', address);

//   if (error) {
//     console.error('위치 기반 스탬프 리스트 가져오기 오류 :', error.message);
//     throw new Error('위치 기반 스탬프 리스트 데이터를 가져오는 중 오류가 발생했습니다.' + error.message);
//   }
//   console.log('nowStampList', nowStampList);
//   return nowStampList;
// };

// //로그인유저가 찍은 스탬프의 별칭만 업데이트
export const fatchLocationAlias = async (alias: string, userId: string, address: string) => {
  const serverClient = createClient();

  const { data, error } = await serverClient
    .from('stamp')
    .update({ aliasLocation: alias })
    .eq('user_id', userId)
    .eq('address', address);
  if (error) console.log('error', error);
  return data;
};
