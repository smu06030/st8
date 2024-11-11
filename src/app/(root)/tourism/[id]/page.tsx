import { getTourismDetail } from '@/serverActions/tourism';
import TourismDetail from '@/components/tourism/TourismDetail';
import { getUser } from '@/serverActions/user';

interface TourismDetailPageProps {
  params: {
    id: string;
  };
}

const TourismDetailPage = async ({ params }: TourismDetailPageProps) => {
  const { id } = params;
  const tourismDetail = await getTourismDetail(id);

  return <TourismDetail tourismDetail={tourismDetail} contentId={id} />;
};

export default TourismDetailPage;
