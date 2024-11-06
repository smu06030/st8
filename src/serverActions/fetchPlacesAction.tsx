'use server';

import browserClient from '@/utils/supabase/client';

export interface Place {
  firstimage: string | null;
  contentid: string | null;
  title: string | null;
  city: string | null;
  supabaseText: string | null;
  citytitle: string | null;
  citydetail: string | null;
  isBookmarked: boolean; // 북마크 상태 추가
}

// 데이터 호출 함수 (북마크 상태 추가)
export const fetchPlaceData = async (userId: string, page: number = 1, limit: number = 50): Promise<Place[]> => {
  try {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data: supabaseData, error } = await browserClient
      .from('tourlist')
      .select(
        `
        contentid,
        title,
        text,
        city,
        citytitle,
        citydetail,
        firstimage,
        bookmark!left (choose)
      `
      )
      .range(start, end)
      .eq('bookmark.user_id', userId); // 특정 사용자의 북마크 상태만 가져오기

    if (error) {
      console.error('Supabase 데이터 요청 실패:', error);
      return [];
    }

    if (!supabaseData || supabaseData.length === 0) {
      console.warn('Supabase 데이터가 비어있습니다.');
      return [];
    }

    // 데이터 매핑: 북마크 상태 추가
    return supabaseData.map((item) => ({
      firstimage: item.firstimage ?? null,
      contentid: item.contentid ?? null,
      title: item.title ?? null,
      city: item.city ?? null,
      supabaseText: item.text ?? null,
      citytitle: item.citytitle ?? null,
      citydetail: item.citydetail ?? null,
      isBookmarked: item.bookmark ? item.bookmark.some((bookmark: any) => bookmark.choose === true) : false // 북마크 상태 확인
    }));
  } catch (e) {
    console.error('데이터 요청 중 예외 발생:', e);
    return [];
  }
};
