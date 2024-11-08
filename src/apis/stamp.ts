import browserClient from '@/utils/supabase/client';
import { STAMPIMG_REGION_ACTIVE_IMG } from '@/utils/region/RegionNames';

// 현재위치기반 스탬프 가져오기
export const getStampLocation = async (address: string, userId: string) => {
  const { data: userLocationStamp, error } = await browserClient
    .from('stamp')
    .select('*')
    .eq('user_id', userId)
    .eq('address', address);

  if (error) {
    console.error('위치 기반 스탬프 리스트 가져오기 오류 :', error.message);
    throw new Error('위치 기반 스탬프 리스트 데이터를 가져오는 중 오류가 발생했습니다.' + error.message);
  }
  return userLocationStamp;
};

// 현재위치 스탬프 추가
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

// 현재위치 스탬프 삭제
export const deleteStamp = async ({ address, userId }: { address: string; userId: string }) => {
  const { data, error } = await browserClient.from('stamp').delete().eq('address', address).eq('user_id', userId);
  if (error) {
    console.error('스탬프 삭제 오류 :', error.message);
    throw new Error('스탬프를 삭제하는 중 오류가 발생했습니다.' + error.message);
  }
  return data;
};
