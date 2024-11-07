import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { REGION_NAME_MAP_KO } from '@/utils/region/RegionNames';
interface RegionStampPropsType {
  list: string;
  stampList: {
    address: string;
    aliasLocation: string;
    id: string;
    lat: string;
    lng: string;
    user_id: string;
    region: string;
    visited: boolean;
    created_at: string;
    stampimg: string;
  }[];
}

const StampItem = ({ list, stampList }: RegionStampPropsType) => {
  const region = REGION_NAME_MAP_KO[list] || list;
  const stampImg = [...new Set(stampList.filter((item) => item.region === list).map((item) => item.stampimg))].join(
    ', '
  );

  return (
    <>
      <li className="flex flex-col items-center justify-center rounded-[24px] bg-[white] p-[20px]">
        <Link href={`/stamp-all/${region}`} className="flex flex-col items-center">
          <Image src={stampImg} alt={region} width={300} height={300} />
        </Link>
      </li>
    </>
  );
};

export default StampItem;
