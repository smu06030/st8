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

const StampItem = ({ list, stampList }: StampCardPropsType) => {
  const stampImg = [...new Set(stampList.filter((item) => item.region === list).map((item) => item.stampimg))];
  const stampImgSt = stampImg.join(', ');
  const stampLength = stampList.filter((item) => item.region === list).length;

  return (
    <li className="flex flex-col items-center justify-center bg-[#ccc] p-3">
      <Link href={`/stamp-all/${list}`}>
        <Image src={stampImgSt} alt={list} width={300} height={300} />
        <div className="font-black">{list}</div>
        <span>{stampLength}개</span>
      </Link>
    </li>
  );
};

export default StampItem;
