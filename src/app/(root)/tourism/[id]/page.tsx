import { getTourismDetail } from '@/serverActions/tourism';
import TourismDetail from '@/components/tourism/TourismDetail';

interface TourismDetailPageProps {
  params: {
    id: string;
  };
}

const TourismDetailPage = async ({ params }: TourismDetailPageProps) => {
  const { id } = params;
  const tourismDetail = await getTourismDetail(id);

  if (tourismDetail instanceof Response) {
    const error: any = await tourismDetail.json();
    console.log(error);
    throw new Error(error.message);
  }

  return <TourismDetail tourismDetail={tourismDetail} contentId={id} />;
};

export default TourismDetailPage;
