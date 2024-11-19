// import browserClient from '@/utils/supabase/client';

// export const getPhotoCount = async (userId: string): Promise<number> => {
//   const { count, error } = await browserClient.from('album').select('*', { count: 'exact' }).eq('user_id', userId);

//   if (error) {
//     console.error('사진 개수를 불러오는 중 오류:', error);
//     throw new Error('Failed to fetch photo count');
//   }

//   return count || 0;
// };
