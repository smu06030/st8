'use server';

import { createClient } from '@/utils/supabase/server';
import { getUser } from './user';

// 추천 여행지 디테일 정보 가져오기
export const getTourismDetail = async (id: string) => {
  const serverClient = createClient();
  const user = await getUser();

  const { data, error } = await serverClient
    .from('tourlist')
    .select('title, text, bookmark: bookmark(choose, user_id)')
    .eq('contentid', id)
    .single();
  if (error) throw new Error(error.message);

  const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;

  const [apiData, introData] = await Promise.all([
    fetch(
      `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
    ).then((res) => res.json()),
    fetch(
      `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=모아&_type=json&contentId=${id}&contentTypeId=12&serviceKey=${OPEN_KEY}`
    ).then((res) => res.json())
  ]);

  const item = apiData.response?.body?.items?.item?.[0] || {};
  const introItem = introData.response?.body?.items?.item?.[0] || {};

  // 북마크 상태 확인
  const isBookmarked = user ? data.bookmark.some((bookmark) => bookmark.user_id === user.id && bookmark.choose) : false;

  return {
    text: data?.text || '제목을 불러올 수 없습니다',
    title: data?.title || '내용을 불러올 수 없습니다',
    isBookmarked,
    firstImage: item?.firstimage || '/placeholder.png',
    overview: item?.overview || '상세 설명을 불러올 수 없습니다',
    mapX: item?.mapx || null,
    mapY: item?.mapy || null,
    address: item?.addr1 || '주소를 불러올 수 없습니다',
    openDate: introItem?.opendate || '',
    restDate: introItem?.restdate || '',
    parking: (introItem?.parking || '').replace(/<br>/g, ' '),
    babyCarriage: introItem?.chkbabycarriage || '',
    creditCard: introItem?.chkcreditcard || ''
  };
};
