'use client';

import TourismCard from '@/components/tourism/TourismCard';
import useUserId from '@/hooks/useUserId';
import LoadingBounce from '@/components/common/Loading/Loading';
import { useGetBookmarkListQuery } from '@/queries/query/useBookmarkQuery';

const BookmarkPage = () => {
  const userId = useUserId();
  const { data: bookmarkList, isPending } = useGetBookmarkListQuery(userId);

  if (isPending || !Array.isArray(bookmarkList)) {
    return <LoadingBounce />;
  }

  if (!bookmarkList || bookmarkList?.length === 0) {
    return <p>좋아하는 장소가 없습니다. 마음에 드는 장소를 북마크해보세요!</p>;
  }

  return (
    <div>
      <div className="mb-6 ml-6 text-xl font-semibold leading-relaxed text-[#140f00]">
        찜한 여행지 ({bookmarkList?.length}개)
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {bookmarkList?.map((place) => (
          <TourismCard
            key={place.contentid}
            userId={userId}
            firstimage={place.firstimage}
            description={place.text}
            contentId={place.contentid}
            title={place.title}
            isBookmarked={place.isBookmarked}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;
