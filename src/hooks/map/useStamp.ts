import { useMemo } from 'react';
import { useGetStampListQuery } from '@/hooks/queries/query/useStampQuery';
import { stampSiDoFormatter } from '@/utils/region/siDoFormatter';

import useUserId from '../auth/useUserId';

const useStamp = () => {
  const userId = useUserId();

  const { data, isPending, isError } = useGetStampListQuery(userId);

  if (isError) {
    const errorMessage = '스탬프 데이터를 가져오는 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }

  const stampList = useMemo(() => stampSiDoFormatter(data), [data]);

  return {
    stampList,
    isPending
  };
};

export default useStamp;
