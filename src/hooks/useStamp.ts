import { useMemo } from 'react';
import useUserId from './useUserId';
import { useGetStampListQuery } from '@/queries/query/useStampQuery';
import { stampSiDoFormatter } from '@/utils/region/siDoFormatter';

const useStamp = () => {
  const userId = useUserId();

  const { data, isPending } = useGetStampListQuery(userId);

  const stampList = useMemo(() => stampSiDoFormatter(data), [data]);

  return {
    stampList,
    isPending
  };
};

export default useStamp;
