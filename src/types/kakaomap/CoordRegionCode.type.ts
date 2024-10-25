export type GeoData = {
  name: string; // 지역 이름
  path: PathType; // 경로 정보
  isHover: boolean; // 호버 상태
  key: number; // 고유 키
};

export type PathType = { lng: number; lat: number }[][];

export type PolygonPath = { lng: number; lat: number };

export type CoordRegionCode = {
  type: string;
  features: Feature[];
};

export type Feature = {
  type: FeatureType;
  geometry: Geometry;
  properties: Properties;
};

export type Geometry = {
  type: GeometryType;
  coordinates: CoordinatesType;
};

export type CoordinatesType = (number[] | number)[][][];

export type GeometryType = 'Polygon' | 'MultiPolygon';

export type Properties = {
  CTPRVN_CD: string;
  CTP_ENG_NM: string;
  CTP_KOR_NM: string;
};

export type FeatureType = 'Feature';
