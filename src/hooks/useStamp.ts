import useUser from './useUser';
import useQuerys from '@/queries/useQuerys';

const useStamp = () => {
  const userId = useUser();

  const { data: stampList, isPending } = useQuerys.useGetStampActive(userId);

  return {
    stampList,
    isPending
  };
};

export default useStamp;
