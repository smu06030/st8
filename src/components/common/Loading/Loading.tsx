import CameraIcon from '@/components/common/Icons/Loading/CameraIcon';

const LoadingBounce = () => (
  <div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-backgroundGradient"
    aria-hidden="true"
  >
    <CameraIcon />
    <div className="mt-4 text-lg leading-[27px] text-secondary-900">모아가 여행을 준비중이에요</div>
  </div>
);

export default LoadingBounce;
