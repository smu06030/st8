import LoadingSpin from '@/components/common/Loading/Loading';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-backgroundGradient">
      <LoadingSpin />
      <div className="text-lg mt-4 leading-[27px] text-secondary-900">모아가 여행을 준비중이에요</div>
    </div>
  );
};

export default Loading;
