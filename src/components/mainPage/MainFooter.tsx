import Link from 'next/link';
import MainBackground from '../common/Icons/MainBackground';
import Icon from '../common/Icons/Icon';

const MainFooter = () => {
  return (
    <>
      <div className="relative h-[373px] w-full">
        <MainBackground />
      </div>
      <Link
        href={'/stamp-tracking'}
        className="fixed bottom-[100px] right-6 cursor-pointer rounded-full shadow-mainStampShadow"
      >
        <Icon name="StampIcon" size={86} color="#23C9FF" bgColor="white" rx="43" />
      </Link>
    </>
  );
};
export default MainFooter;
