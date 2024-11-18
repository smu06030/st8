import MainBackground from '@/components/common/Icons/MainBackgroundIcon';
import StampTrackingLinkButton from '@/components/common/Buttons/StampTrackingLinkButton';

const MainFooter = () => {
  return (
    <>
      <div className="relative -z-10 h-[373px] w-full overflow-hidden lg:hidden">
        <MainBackground />
      </div>
      <StampTrackingLinkButton />
    </>
  );
};
export default MainFooter;
