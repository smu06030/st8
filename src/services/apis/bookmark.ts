import { bookmark } from '@/types/tourism/tourism.type';

import browserClient from '@/utils/supabase/client';

// 북마크 정보 가져오기
export const getBookmarkList = async (userId: string): Promise<bookmark[]> => {
  const { data: bookmarkList, error } = await browserClient
    .from('bookmark')
    .select(
      `
      contentid,
      choose,
      tourlist (
        title,
        text,
        firstimage
      )
    `
    )
    .eq('user_id', userId);

  if (error) {
    console.error('북마크 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw new Error('북마크 정보 가져오기 실패');
  }

  return bookmarkList.map((bookmark: any) => ({
    contentid: bookmark.contentid,
    title: bookmark.tourlist.title,
    text: bookmark.tourlist.text,
    firstimage: bookmark.tourlist.firstimage,
    isBookmarked: bookmark.choose || false
  }));
};

// 북마크 상태 업데이트
export const updateBookmarkStatus = async ({
  contentId,
  userId,
  isBookmarked,
  title,
  description
}: {
  contentId: string;
  userId: string;
  isBookmarked: boolean;
  title: string;
  description: string;
}): Promise<void> => {
  try {
    if (!isBookmarked) {
      // 북마크 추가
      const { error } = await browserClient
        .from('bookmark')
        .insert([{ contentid: contentId, user_id: userId, title: title, text: description, choose: true }]);

      if (error) throw error;
      console.log('북마크 추가 성공');
    } else {
      const { error } = await browserClient.from('bookmark').delete().eq('contentid', contentId).eq('user_id', userId);

      if (error) throw error;
      console.log('북마크 해제 성공');
    }
  } catch (error) {
    console.error('북마크 업데이트에 실패했습니다:', error);
  }
};

// 단일 북마크 정보 가져오기
export const getSingleBookmarkStatus = async (userId: string, contentId: string) => {
  const { data: bookmark } = await browserClient
    .from('bookmark')
    .select('choose')
    .eq('contentid', contentId)
    .maybeSingle();

  console.log(bookmark, contentId);
  return bookmark;
};
