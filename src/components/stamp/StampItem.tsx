import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
//list(전체지역이름) stampList(유저가 갖고있는 스탬프데이터)

const StampItem = ({ list, stampList }: StampCardPropsType) => {
  const groupTrueRegion = [...new Set(stampList?.map((item) => item.region))]; //갖고있는스탬프 지역이름
  const defaultItemCount = list.length; //17
  const remainingItemCount = defaultItemCount - groupTrueRegion.length; //비활 지역갯수

  const stampImg = [...new Set(stampList.filter((item) => item.region === list).map((item) => item.stampimg))];
  const stampImgSt = stampImg.join(', ');
  const stampLength = stampList.filter((item) => item.region === list).length;
  //이미지를 디폴트 해당지역으로 바꾸면댈듯???
  return (
    <li className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
      <Link href={`/stamp-all/${list}`} className="flex flex-col items-center">
        <Image src={stampImgSt ? stampImgSt : '/images/goole-icon.png'} alt={list} width={300} height={300} />
        <div className="font-black">{list}</div> {/* TODO: 지우기 */}
        <span>{stampLength}개</span>
      </Link>
    </li>
  );
};

export default StampItem;
// {"/images/default-img.png"}
