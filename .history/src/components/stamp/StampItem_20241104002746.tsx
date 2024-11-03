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
  const stampImg = [...new Set(stampList.filter((item) => item.region === list).map((item) => item.stampimg))];
  const stampImgSt = stampImg.join(', ');
  const stampLength = stampList.filter((item) => item.region === list).length;

  return (
    <>
      <li className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
        <Link href={`/stamp-all/${list}`} className="flex flex-col items-center">
          <Image src={stampImgSt} alt={list} width={300} height={300} />
          <div className="font-black">{list}</div> {/* TODO: 지우기 */}
          <span>{stampLength}개</span>
        </Link>
      </li>
    </>
  );
};

export default StampItem;
