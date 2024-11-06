import browserClient from '@/utils/supabase/client';

const updateBookmarkStatus = async (
  contentid: string,
  user_id: string,
  isBookmarked: boolean,
  title: string,
  text: string,
  choose: boolean = true
): Promise<void> => {
  try {
    if (!isBookmarked) {
      // 북마크 추가
      const { error } = await browserClient
        .from('bookmark')
        .insert([{ contentid: contentid, user_id: user_id, title: title, text: text, choose: choose }]);

      if (error) throw error;
      console.log('북마크 추가 성공');
    } else {
      const { error } = await browserClient.from('bookmark').delete().eq('contentid', contentid).eq('user_id', user_id);

      if (error) throw error;
      console.log('북마크 해제 성공');
    }
  } catch (error) {
    console.error('북마크 업데이트에 실패했습니다:', error);
  }
};

export default updateBookmarkStatus;
