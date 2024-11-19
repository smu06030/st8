// import browserClient from '@/utils/supabase/client';

// export const getStampCount = async (userId: string) => {
//   const { count, error } = await browserClient.from('stamp').select('*', { count: 'exact' }).eq('user_id', userId);

//   if (error) {
//     throw new Error('stamp count를 불러오는데 실패');
//   }

//   return count || 0;
// };
