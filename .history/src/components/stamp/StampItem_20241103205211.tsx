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

  const stampImg = [...new Set(stampList.filter((item) => item.region === list).map((item) => item.stampimg))];
  const stampImgSt = stampImg.join(', ');
  const stampLength = stampList.filter((item) => item.region === list).length;

  //이거 전역으러빼기
  const defaultRegionItem = [
    '서울',
    '경기',
    '광주',
    '대전',
    '인천',
    '전북특별자치도',
    '강원특별자치도',
    '부산',
    '대구',
    '울산',
    '세종특별자치시',
    '충북',
    '충남',
    '제주특별자치시',
    '경북',
    '전남',
    '경남'
  ];
  //비활성화 지역
  const stampInActive = defaultRegionItem.filter((item) => !groupTrueRegion.includes(item));

  const defaultImage = '/images/testStamp.png'; //디폴트이미지 임시
  stampInActive;
  return (
    <li className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
      <Link href={`/stamp-all/${list}`} className="flex flex-col items-center">
        <Image src={stampImgSt} alt={list} width={300} height={300} />
        <div className="font-black">{list}</div> {/* TODO: 지우기 */}
        <span>{stampLength ? `${stampLength}개` : ''}</span>
      </Link>
    </li>
  );
};

export default StampItem;
// {"/images/default-img.png"}
