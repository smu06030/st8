'use server';

import { createClient } from '@/utils/supabase/server';
import { Stamp } from '@/types/supabase/table.type';

// 로그인유저의 스템프 항목 전부 + 스탬프 활성화된 데이터만
export const getStampList = async (userId: string): Promise<Stamp[] | Response> => {
  const serverClient = createClient();

  const { data, error } = await serverClient.from('stamp').select('*').eq('user_id', userId).eq('visited', true);

  return Response.json({
    message: '스탬프 데이터를 가져오는 중 오류가 발생했습니다.',
    error: error
  });

  // if (error) {
  //   console.error('스탬프 정보 가져오기 오류 :', error.message);
  // }

  // return data;
};

// 로그인유저가 찍은 스탬프의 별칭만 업데이트
export const patchLocationAlias = async (alias: string, userId: string, address: string) => {
  const serverClient = createClient();

  const { data, error } = await serverClient
    .from('stamp')
    .update({ aliasLocation: alias })
    .eq('user_id', userId)
    .eq('address', address);
  if (error) console.log('error', error);
  return data;
};
