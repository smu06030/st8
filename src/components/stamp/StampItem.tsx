import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { REGION_NAME_MAP_KO, STAMPIMG_REGION_ACTIVE_IMG } from '@/utils/region/RegionNames';
interface StampCardPropsType {
  list: string;
  stampList: {
    id: string;
    user_id: string;
    region: string;
    visited: boolean;
    created_at: string;
    stampimg: string;
  }[];
}

// const ActiveStamp = STAMPIMG_REGION_ACTIVE_IMG[address.region_1depth_name];

const StampItem = ({ list, stampList }: StampCardPropsType) => {
  // const groupTrueRegion = [...new Set(stampList?.map((item) => item.region))]; //갖고있는스탬프 지역이름
  // const defaultItemCount = list.length; //17
  // const remainingItemCount = defaultItemCount - groupTrueRegion.length; //비활 지역갯수
  const region = REGION_NAME_MAP_KO[list] || list;

  const stampImg = [...new Set(stampList.filter((item) => item.region === list).map((item) => item.stampimg))];
  const stampImgSt = stampImg.join(', ');
  const stampLength = stampList.filter((item) => item.region === list).length;
  console.log('stampImg', stampImg);
  return (
    <>
      <li className="flex flex-col items-center justify-center rounded-[24px] bg-[white] p-[20px]">
        <Link href={`/stamp-all/${region}`} className="flex flex-col items-center">
          <Image src={stampImgSt} alt={region} width={300} height={300} />
          {/* <div className="font-black">{list}</div> 활성지역이름
          <span>{stampLength}개</span> 갯수*/}
        </Link>
      </li>
    </>
  );
};

export default StampItem;
