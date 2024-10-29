import { useMemo } from 'react';
import useUser from './useUser';
import useQuerys from '@/queries/useQuerys';
import { stampSiDoFormatter } from '@/utils/region/siDoFormatter';

const useStamp = () => {
  const userId = useUser();

  const { data, isPending } = useQuerys.useGetStampActive(userId);

  const stampList = useMemo(() => stampSiDoFormatter(data), [data]);

  return {
    stampList,
    isPending
  };
};

export default useStamp;
