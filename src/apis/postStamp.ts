import browserClient from '@/utils/supabase/client';
import { STAMPIMG_REGION_ACTIVE_IMG } from '@/utils/region/RegionNames';

//스탬프 추가
export const postStamp = async ({
  region,
  address,
  userId,
  location,
  aliasLocation
}: {
  address: string;
  region: string;
  userId: string;
  location: { lat: number; lng: number };
  aliasLocation: string | null;
}) => {
  const { data, error } = await browserClient.from('stamp').insert({
    user_id: userId,
    region: region,
    address: address,
    stampimg: STAMPIMG_REGION_ACTIVE_IMG[region],
    visited: true,
    lat: location.lat,
    lng: location.lng,
    aliasLocation: aliasLocation
  });
  if (error) {
    console.error('스탬프 추가 오류 :', error.message);
    throw new Error('스탬프를 추가하는 중 오류가 발생했습니다.' + error.message);
  }
  return data;
};
