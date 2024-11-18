import { Tourism } from '@/types/tourism/tourism.type';

import browserClient from '@/utils/supabase/client';

// 추천 여행지 리스트 가져오기
export const getTourismList = async (userId: string): Promise<Tourism[]> => {
  try {
    const { data: tourismList, error } = await browserClient
      .from('tourlist')
      .select('contentid, title, text, city, citytitle, citydetail, firstimage, bookmark: bookmark(choose, user_id)');

    if (error) {
      console.error('Supabase 데이터 요청 실패:', error);
      return [];
    }

    if (!tourismList || tourismList.length === 0) {
      console.warn('Supabase 데이터가 비어있습니다.');
      return [];
    }

    // 데이터 매핑: 북마크 상태 추가
    return tourismList.map((tourism) => ({
      firstimage: tourism.firstimage ?? null,
      contentid: tourism.contentid ?? null,
      title: tourism.title ?? null,
      city: tourism.city ?? null,
      supabaseText: tourism.text ?? null,
      citytitle: tourism.citytitle ?? null,
      citydetail: tourism.citydetail ?? null,
      isBookmarked:
        tourism.bookmark.length > 0
          ? tourism.bookmark.some((bookmark) => bookmark.user_id === userId && bookmark.choose)
          : false
    }));
  } catch (e) {
    console.error('데이터 요청 중 예외 발생:', e);
    return [];
  }
};
