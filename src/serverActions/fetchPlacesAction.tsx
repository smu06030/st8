'use server';

import { createClient } from '@/utils/supabase/server';

export interface Place {
  firstimage: string | null;
  contentid: string | null;
  title: string | null;
  city: string | null;
  supabaseText: string | null;
  citytitle: string | null;
  citydetail: string | null;
}

// 데이터 호출 함수 (서버에서 호출)
export const fetchPlaceData = async (): Promise<Place[]> => {
  const serverClient = createClient();
  try {
    const { data: supabaseData, error } = await serverClient
      .from('tourlist')
      .select('contentid, title, text, city, citytitle, citydetail, firstimage');

    if (error) {
      console.error('Supabase 데이터 요청 실패:', error);
      return [];
    }

    if (!supabaseData || supabaseData.length === 0) {
      console.warn('Supabase 데이터가 비어있습니다.');
      return [];
    }

    return supabaseData.map((item) => ({
      firstimage: item.firstimage ?? null,
      contentid: item.contentid ?? null,
      title: item.title ?? null,
      city: item.city ?? null,
      supabaseText: item.text ?? null,
      citytitle: item.citytitle ?? null,
      citydetail: item.citydetail ?? null
    }));
  } catch (e) {
    console.error('데이터 요청 중 예외 발생:', e);
    return [];
  }
};
