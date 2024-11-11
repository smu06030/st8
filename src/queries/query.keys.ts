export const QUERY_KEY = {
  AREAS: ['areas'],
  USER: (userId: string) => ['user', userId],
  USER_LOCATION_STAMP: ['userLocationStamp'],
  STAMPLIST: (userId: string) => ['stampList', userId],
  PLACELIST: ['placeList'],
  PLACE_DETAIL: (placeId: string) => ['placeDetail', placeId],
  RECOMMENDED_PLACES: (userId: string) => ['recommendedPlaces', userId],
  REVIEWS: (placeId: string) => ['reviews', placeId],
  BOOKMARKS: (userId: string) => ['bookmarks', userId],
  SEARCH_RESULTS: (query: string) => ['searchResults', query],
  STAMP_COUNT: (userId: string) => ['stampCount', userId],
  Album: ['photo']
};
