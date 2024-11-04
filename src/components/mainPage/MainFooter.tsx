import Link from 'next/link';
import MainBackground from '../common/Icons/MainBackground';
import Icon from '../common/Icons/Icon';

const MainFooter = () => {
  return (
    <>
      <div className="relative -bottom-6 -left-6">
        <MainBackground />
      </div>
      <Link
        href={'/stamp-tracking'}
        className="shadow-mainStampShadow fixed bottom-[46px] right-6 cursor-pointer rounded-full"
      >
        <Icon name="StampIcon" size={86} color="#23C9FF" bgColor="white" rx="43" />
      </Link>
    </>
  );
};
export default MainFooter;
