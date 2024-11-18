import Link from 'next/link';
import Icon from '@/components/common/Icons/Icon';

const StampTrackingLinkButton = () => {
  return (
    <Link
      href={'/stamp-tracking'}
      className="fixed bottom-[100px] right-6 z-[99] cursor-pointer rounded-full shadow-mainStampShadow lg:hidden"
    >
      <Icon name="StampIcon" size={86} color="#23C9FF" bgColor="white" rx="43" />
    </Link>
  );
};

export default StampTrackingLinkButton;
