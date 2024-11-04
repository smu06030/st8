'use server';

import fs from 'fs';
import path from 'path';
import { createClient } from '@/utils/supabase/server';

export interface Place {
  firstimage: string | null;
  contentid: string | null;
  title: string | null;
  city: string | null;
  supabaseText: string | null;
}

export const fetchPlaces = async () => {
  const serverClient = createClient();
  const { data: supabaseData, error } = await serverClient.from('tourlist').select('contentid, title, text, city');

  if (error) {
    console.error('Supabase 데이터 요청 실패:', error);
    return {};
  }

  // db.json 파일 경로 설정
  const filePath = path.join(process.cwd(), 'db.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const jsonParsedData = JSON.parse(jsonData);

  // contentid 매칭하여 JSON 파일에서 데이터를 가져오기
  const allPlaces: (Place | null)[] = supabaseData.map((placeData) => {
    const jsonPlaceData = jsonParsedData.find((item: any) => item.contentid === placeData.contentid);

    if (jsonPlaceData) {
      return {
        contentid: placeData.contentid,
        title: placeData.title ?? null,
        firstimage: jsonPlaceData.firstimage ?? null,
        city: placeData.city ?? null,
        supabaseText: placeData.text ?? null
      };
    }
    return null;
  });

  const validPlaces: Place[] = allPlaces.filter((place): place is Place => place !== null);

  const groupedByCity: Record<string, Place[]> = validPlaces.reduce<Record<string, Place[]>>((acc, place) => {
    const city = place.city || '기타';
    if (!acc[city]) acc[city] = [];
    acc[city].push(place);
    return acc;
  }, {});

  return groupedByCity;
};
