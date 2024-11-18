import { Stamp } from '@/types/supabase/table.type';
import { GeoData } from '@/types/stamp/coordRegionCode.type';

// geoList 시, 도 이름 포멧
export const geoListSiDoFormatter = (geoList: GeoData[]) => {
  return geoList.map((geo) => ({ ...geo, name: formattedName(geo.name) }));
};

// stamp 시, 도 이름 포멧
export const stampSiDoFormatter = (stampList: Stamp[] | undefined) => {
  return stampList?.map((stamp) => ({ ...stamp, region: formattedName(stamp.region) }));
};

export const formattedName = (name: Stamp['region']) => {
  return name
    .replace(/특별시|광역시|특별자치도|특별자치시|도/g, '') // '특별시', '광역시', '특별자치도', '특별자치시', '도' 제거
    .replace(/충청|전라|경상/, (match) => match.slice(0, 1)); // '충청북도' -> '충북', '전라남도' -> '전남', '경상남도' -> '경남'
};
