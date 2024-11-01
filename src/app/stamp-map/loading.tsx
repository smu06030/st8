import LoadingSpin from '@/components/common/Loading/Loading';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <LoadingSpin />
    </div>
  );
};

export default Loading;
