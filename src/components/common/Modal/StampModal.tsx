import { ReactPortal } from 'react';
import { useMapStore } from '@/providers/mapStoreProvider';
import { REGION_NAME_MAP_KO } from '@/utils/region/RegionNames';

import Icon from '../Icons/Icon';
import Link from 'next/link';
import Image from 'next/image';

interface StampModalPropsType {
  Modal: ({ children }: { children: React.ReactNode }) => ReactPortal | null;
}

const StampModal = ({ Modal }: StampModalPropsType) => {
  const stamp = useMapStore((state) => state.stampInfo);

  const date = new Date(stamp.created_at);

  // 날짜 형식 변환
  const formattedDate = `${date.getUTCFullYear()}년 ${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일 ${date.getUTCHours() + 9}시`;
  // 동적 라우트 경로
  const regionLink = REGION_NAME_MAP_KO[stamp.region];

  return (
    <Modal>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 z-[1001] flex h-[342px] w-full flex-col items-center justify-center rounded-tl-[32px] rounded-tr-[32px] bg-white p-6 shadow-overlayShadow lg:bottom-1/2 lg:left-1/2 lg:h-auto lg:w-[375px] lg:-translate-x-1/2 lg:translate-y-1/2 lg:transform lg:rounded-[32px] mo-only:animate-slideDownModal"
      >
        <div className="-mt-[50px] mb-[18px] h-[152px] w-[152px] rounded-full border-4 border-white bg-white lg:-mt-[80px]">
          <Image src={stamp.stampimg} alt={stamp.region} width={146} height={146} priority />
        </div>
        <div className="mb-7 font-semiBold text-2xl leading-[31.20px]">{stamp.region} 스탬프</div>
        <div>
          <div className="mb-[14px] flex items-center justify-start gap-2">
            <span>
              <Icon name="TimeIcon" size={32} color="white" bgColor="#00688A" rx="16" />
            </span>
            <p className="h-6 w-[186px] truncate leading-normal text-gray-700">{formattedDate}</p>
          </div>
          <div className="flex items-center justify-start gap-2">
            <span>
              <Icon name="ComPassIcon" size={32} color="white" bgColor="#00688A" rx="16" />
            </span>
            <p className="h-6 w-[186px] truncate leading-normal text-gray-700">{stamp.address}</p>
          </div>
        </div>
        <Link
          href={`/stamp-all/${regionLink}`}
          className="mb-3 mt-9 cursor-pointer text-sm leading-tight text-gray-500 underline"
        >
          스탬프 보러가기
        </Link>
      </div>
    </Modal>
  );
};

export default StampModal;
