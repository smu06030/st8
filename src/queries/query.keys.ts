export const QUERY_KEY = {
  AREAS: ['areas'],
  USER: (userId: string) => ['user', userId],
  USER_LOCATION_STAMP: ['userLocationStamp'],
  STAMP_LIST: (userId: string) => ['stampList', userId],
  TOURISM_LIST: ['tourismList'],
  RECOMMENDED_PLACES: (userId: string) => ['recommendedPlaces', userId],
  REVIEWS: (placeId: string) => ['reviews', placeId],
  BOOKMARK: (userId: string) => ['bookmark', userId],
  SINGLE_BOOKMARK: (contentId: string) => ['bookmark', contentId],
  SEARCH_RESULTS: (query: string) => ['searchResults', query],
  STAMP_COUNT: (userId: string) => ['stampCount', userId],
  ALBUM: ['photo']
};
