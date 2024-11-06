'use client';

import React, { useEffect, useState } from 'react';
import browserClient from '@/utils/supabase/client';
import PlaceCard from '../../../components/tourism/placeCard';
import useUser from '@/hooks/useUser';
import LoadingBounce from '@/components/common/Loading/Loading';

interface Place {
  contentid: string;
  title: string;
  text: string;
  firstimage: string | null;
}

const BookmarksPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = useUser();

  // 북마크된 장소의 정보를 가져오는 함수
  const fetchBookmarksWithDetails = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await browserClient
        .from('bookmark')
        .select(
          `
            contentid,
            tourlist (
              title,
              text,
              firstimage
            )
          `
        )
        .eq('user_id', userId);

      if (error) {
        console.error('북마크 데이터를 가져오는 중 오류가 발생했습니다:', error);
        setPlaces([]);
      } else if (data) {
        const placesData: Place[] = data.map((bookmark: any) => ({
          contentid: bookmark.contentid,
          title: bookmark.tourlist.title,
          text: bookmark.tourlist.text,
          firstimage: bookmark.tourlist.firstimage
        }));
        setPlaces(placesData);
      }
    } catch (error) {
      console.error('북마크 데이터를 가져오는 중 예기치 않은 오류가 발생했습니다:', error);
      setPlaces([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 북마크 해제 시 장소를 목록에서 제거하는 함수
  const handleRemoveBookmark = (contentid: string) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.contentid !== contentid));
  };

  // 페이지가 렌더링될 때 북마크 목록을 가져옵니다.
  useEffect(() => {
    fetchBookmarksWithDetails();
  }, [userId]);

  if (isLoading) {
    return <LoadingBounce />;
  }

  if (places.length === 0) {
    return <p>좋아하는 장소가 없습니다. 마음에 드는 장소를 북마크해보세요!</p>;
  }

  return (
    <div>
      <div className="mb-6 ml-6 text-xl font-semibold leading-relaxed text-[#140f00]">
        찜한 여행지 ({places.length}개)
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {places.map((place) => (
          <PlaceCard
            key={place.contentid}
            firstimage={place.firstimage}
            description={place.text}
            contentid={place.contentid}
            title={place.title}
            onRemoveBookmark={() => handleRemoveBookmark(place.contentid)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
