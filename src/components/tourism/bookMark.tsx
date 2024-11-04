import browserClient from '@/utils/supabase/client';

async function getUserIdFromProfile() {
  try {
    const {
      data: { session },
      error: sessionError
    } = await browserClient.auth.getSession();

    if (sessionError || !session) {
      console.error('로그인 세션 조회 실패:', sessionError);
      throw new Error('사용자가 로그인되어 있지 않습니다.');
    }

    return session.user.id;
  } catch (error) {
    console.error('Error fetching user ID from profile:', error);
    return null;
  }
}

async function addBookmark({
  user_id,
  contentId,
  title,
  text
}: {
  user_id: string;
  contentId: string;
  title: string;
  text: string;
}) {
  try {
    const { error } = await browserClient.from('bookmark').insert([
      {
        user_id,
        contentid: contentId,
        title,
        text
      }
    ]);

    if (error) {
      console.error('Error inserting bookmark:', error);
      return false;
    }

    console.log('Bookmark added successfully');
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return false;
  }
}

async function removeBookmark(user_id: string, contentId: string) {
  try {
    const { error } = await browserClient.from('bookmark').delete().eq('user_id', user_id).eq('contentid', contentId);

    if (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }

    console.log('Bookmark removed successfully');
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
}

async function isBookmarkExists(user_id: string, contentId: string) {
  try {
    const { data, error } = await browserClient
      .from('bookmark')
      .select('id')
      .eq('user_id', user_id)
      .eq('contentid', contentId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking bookmark existence:', error);
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking if bookmark exists:', error);
    return false;
  }
}

const handleBookmarkClick = async (contentId: string, title: string, text: string) => {
  const user_id = await getUserIdFromProfile();
  if (!user_id) {
    alert('로그인 후에 북마크를 추가할 수 있습니다.');
    return;
  }

  try {
    const bookmarkExists = await isBookmarkExists(user_id, contentId);

    if (bookmarkExists) {
      const isBookmarkRemoved = await removeBookmark(user_id, contentId);
      if (isBookmarkRemoved) {
        alert('북마크가 삭제되었습니다.');
      } else {
        alert('북마크 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      const isBookmarkAdded = await addBookmark({ user_id, contentId, title, text });
      if (isBookmarkAdded) {
        alert('북마크가 추가되었습니다!');
      } else {
        alert('북마크 추가에 실패했습니다. 다시 시도해주세요.');
      }
    }
  } catch (error) {
    console.error('Error handling bookmark click:', error);
    alert('북마크 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

export { handleBookmarkClick };
