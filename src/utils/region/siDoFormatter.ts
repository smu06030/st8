import { GeoData } from '@/types/kakaomap/CoordRegionCode.type';

// 시도 이름 포멧
export const siDoFormatter = (geoList: GeoData[]) => {
  return geoList.map((geo) => {
    const formattedName = geo.name
      .replace(/특별시|광역시|특별자치도|특별자치시|도/g, '') // '특별시', '광역시', '특별자치도', '특별자치시', '도' 제거
      .replace(/충청|전라|경상/, (match) => match.slice(0, 1)); // '충청북도' -> '충북', '전라남도' -> '전남', '경상남도' -> '경남'

    return { ...geo, name: formattedName };
  });
};
