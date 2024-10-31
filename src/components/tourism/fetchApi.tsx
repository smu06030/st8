import browserClient from '../../utils/supabase/client';

export interface Place {
  firstimage: string | null;
  city: string | null;
  supabaseText: string | null;
}

export const fetchPlaces = async (): Promise<Record<string, Place[]>> => {
  const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
  const { data: supabaseData, error } = await browserClient.from('tourlist').select('contentid, text, city');

  if (error) {
    console.error('Supabase 데이터 요청 실패:', error);
    return {};
  }

  const contentIds = supabaseData.map((item) => item.contentid);

  const allPlaces: (Place | null)[] = await Promise.all(
    contentIds.map(async (contentid) => {
      try {
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
        );

        if (!response.ok) {
          console.error(`API 요청 실패: ${response.status} ${response.statusText}`);
          return null;
        }

        const json = await response.json();
        const placeData = supabaseData.find((item) => item.contentid === contentid);

        return {
          firstimage: json.response.body.items.item[0]?.firstimage ?? null,
          city: placeData?.city ?? null,
          supabaseText: placeData?.text ?? null
        };
      } catch (error) {
        console.error('JSON 파싱 또는 API 요청 중 오류 발생:', error);
        return null;
      }
    })
  );

  const validPlaces: Place[] = allPlaces.filter((place): place is Place => place !== null);

  const groupedByCity: Record<string, Place[]> = validPlaces.reduce<Record<string, Place[]>>((acc, place) => {
    const city = place.city || '기타';
    if (!acc[city]) acc[city] = [];
    acc[city].push(place);
    return acc;
  }, {});

  return groupedByCity;
};
