import { Tourism } from '@/types/tourism/tourism.type';

export const groupTourismByCity = (tourismList: Tourism[]): Record<string, Tourism[]> => {
  return tourismList.reduce<Record<string, Tourism[]>>((acc, tourism) => {
    const city = tourism.city || '기타';
    if (!acc[city]) acc[city] = [];
    acc[city].push(tourism);
    return acc;
  }, {});
};
