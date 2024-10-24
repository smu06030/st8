// 'use client';

// import React from 'react';
// import MyLocation from '@/components/stamp/MyLocation';
// import { useQuery } from '@tanstack/react-query';
// import browserClient from '@/utils/supabase/client';
// const userId = '05a65b78-a87c-49b4-b8e1-e5b80e263e43'; //임시 로그인유저
// //로그인유저의 스템프 항목 중
// const fetchStampId = async (id) => {
//     const { data: stampList, error } = await browserClient
//       .from('stamp')
//       .select('*')
//       .eq('user_id', userId)
//       .eq('id', id);
//     if (error) console.error('가져오기 오류:', error.message);
//     console.log('stampList', stampList);
//     return stampList;
//   };

// const StampTrack = () => {
//   return (
//     <div>
//       <MyLocation fetchStampId/>
//     </div>
//   );
// };

// export default StampTrack;
