'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import useUserId from '@/hooks/useUserId';
import { QUERY_KEY } from '@/queries/query.keys';
import { getStampCount } from '@/apis/stampCount';

const StampCount = () => {
  const userId = useUserId();

  const {
    data: stampCount,
    isLoading,
    isError
  } = useQuery<number>({
    queryKey: [QUERY_KEY.STAMP_COUNT, userId],
    queryFn: () => getStampCount(userId),
    enabled: !!userId
  });

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
      </div>
    );
  }

  return (
    <Link href="/stamp-all">
      <div className="mb-4 flex h-[120px] cursor-pointer items-center justify-between rounded-2xl bg-gray-800 p-6">
        <span className="text-white">
          지금까지 모은 <br />
          <span className="font-bold text-white">스탬프</span>
        </span>
        <span className="font-bold text-2xl text-white">{stampCount !== null ? `${stampCount}개` : '로딩 중...'}</span>
      </div>
    </Link>
  );
};

export default StampCount;
