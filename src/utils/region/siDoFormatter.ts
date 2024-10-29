import { GeoData } from '@/types/stampMap/CoordRegionCode.types';
import { StampType } from '@/types/stampMap/Stamp.types';

// geoList 시, 도 이름 포멧
export const geoListSiDoFormatter = (geoList: GeoData[]) => {
  return geoList.map((geo) => ({ ...geo, name: formattedName(geo.name) }));
};

// stamp 시, 도 이름 포멧
export const stampSiDoFormatter = (stampList: StampType[] | undefined) => {
  return stampList?.map((stamp) => ({ ...stamp, region: formattedName(stamp.region) }));
};

export const formattedName = (name: string) => {
  return name
    .replace(/특별시|광역시|특별자치도|특별자치시|도/g, '') // '특별시', '광역시', '특별자치도', '특별자치시', '도' 제거
    .replace(/충청|전라|경상/, (match) => match.slice(0, 1)); // '충청북도' -> '충북', '전라남도' -> '전남', '경상남도' -> '경남'
};
