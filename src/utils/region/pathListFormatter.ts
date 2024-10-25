import { CoordinatesType } from '@/types/kakaomap/CoordRegionCode.type';
import coordRegionCode from '../../../coordRegionCode.json';

// 행정구역 PathList 가져오기
export const pathListFormatter = () => {
  const { features } = coordRegionCode;

  const data = features.map((item) => {
    const { geometry, properties } = item;
    const { CTP_KOR_NM } = properties;
    const { coordinates, type } = geometry;

    const pathList =
      type === 'Polygon'
        ? getPolygonPathList(coordinates)
        : type === 'MultiPolygon'
          ? getMultiPolygonPathList(coordinates)
          : [];

    return {
      name: CTP_KOR_NM,
      path: pathList,
      isHover: false,
      key: Math.random()
    };
  });

  return data;
};

// Polygon pathList 포멧 (3차원 배열)
const getPolygonPathList = (coordinates: CoordinatesType) => {
  return coordinates.map((areaList) => areaList.map(([lng, lat]) => ({ lng: Number(lng), lat: Number(lat) })));
};

// MultiPolygon pathList 포멧 (4차원 배열)
const getMultiPolygonPathList = (coordinates: CoordinatesType) => {
  return coordinates.flatMap((polygon) =>
    polygon.map(
      (areaList) =>
        areaList
          .map((area) => {
            if (Array.isArray(area)) {
              const [lng, lat] = area;
              return { lng: Number(lng), lat: Number(lat) };
            }
            return null; // null을 반환하는 대신 에러를 방지
          })
          .filter((item): item is { lng: number; lat: number } => item !== null) // null 제거
    )
  );
};
