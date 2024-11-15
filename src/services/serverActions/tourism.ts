'use server';

import { getUser } from './user';
import { createClient } from '@/utils/supabase/server';

// 추천 여행지 디테일 정보 가져오기
export const getTourismDetail = async (id: string) => {
  const serverClient = createClient();
  const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;

  // supabase와 api 요청 병렬로 실행
  const [supabaseResponse, apiResponse, introResponse] = await Promise.all([
    serverClient
      .from('tourlist')
      .select('title, text, bookmark: bookmark(choose, user_id)')
      .eq('contentid', id)
      .single(),
    fetch(
      `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`,
      {
        next: {
          revalidate: 86400 // 1일
        }
      }
    ),
    fetch(
      `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=모아&_type=json&contentId=${id}&contentTypeId=12&serviceKey=${OPEN_KEY}`,
      {
        next: {
          revalidate: 86400 // 1일
        }
      }
    )
  ]);

  // 에러 처리
  if (supabaseResponse.error || !apiResponse.ok || !introResponse.ok) {
    const errorMessage = supabaseResponse.error
      ? 'supabase 오류 : 추천 여행지 디테일 정보를 가져오는 중 오류가 발생했습니다.'
      : !apiResponse.ok
        ? '디테일 정보 API 오류가 발생했습니다.'
        : '인트로 정보 API 오류가 발생했습니다.';

    return Response.json({
      message: errorMessage
    });
  }

  // 요청이 성공했을 경우 데이터 파싱
  const data = supabaseResponse.data;
  const apiData = await apiResponse.json();
  const introData = await introResponse.json();

  const user = await getUser();

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
