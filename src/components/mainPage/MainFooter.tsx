import Link from 'next/link';
import MainBackground from '../common/Icons/MainBackgroundIcon';
import Icon from '../common/Icons/Icon';

const MainFooter = () => {
  return (
    <>
      <div className="relative -z-10 h-[373px] w-full overflow-hidden lg:hidden">
        <MainBackground />
      </div>
      <Link
        href={'/stamp-tracking'}
        className="fixed bottom-[100px] right-6 z-[99] cursor-pointer rounded-full shadow-mainStampShadow lg:hidden"
      >
        <Icon name="StampIcon" size={86} color="#23C9FF" bgColor="white" rx="43" />
      </Link>
    </>
  );
};
export default MainFooter;
