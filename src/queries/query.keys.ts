export const QUERY_KEY = {
  STAMPLIST: (userId: string) => ['stamp', userId],
  PLACES: ['places'],
  PLACE_DETAIL: (placeId: string) => ['placeDetail', placeId],
  USER: (userId: string) => ['user', userId],
  REVIEWS: (placeId: string) => ['reviews', placeId],
  BOOKMARKS: (userId: string) => ['bookmarks', userId],
  SEARCH_RESULTS: (query: string) => ['searchResults', query],
  AREAS: ['areas'],
  RECOMMENDED_PLACES: (userId: string) => ['recommendedPlaces', userId],
  NOWLOCATION_STAMP: ['nowStamp']
};
