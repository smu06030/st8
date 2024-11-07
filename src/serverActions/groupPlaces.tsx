import { Place } from './placeActions';

export const groupPlacesByCity = (places: Place[]): Record<string, Place[]> => {
  return places.reduce<Record<string, Place[]>>((acc, place) => {
    const city = place.city || '기타';
    if (!acc[city]) acc[city] = [];
    acc[city].push(place);
    return acc;
  }, {});
};
