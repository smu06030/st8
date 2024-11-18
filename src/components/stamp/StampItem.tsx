import { Stamp } from '@/types/supabase/table.type';
import { REGION_NAME_MAP_KO } from '@/utils/region/RegionNames';

import Link from 'next/link';
import Image from 'next/image';
interface RegionStampPropsType {
  list: string;
  stampList: Stamp[];
}

const StampItem = ({ list, stampList }: RegionStampPropsType) => {
  const region = REGION_NAME_MAP_KO[list] || list;
  const stampImg = [...new Set(stampList.filter((item) => item.region === list).map((item) => item.stampimg))].join(
    ', '
  );
  console.log(stampImg, region);
  return (
    <>
      <Link href={`/stamp-all/${region}`} className="flex flex-col items-center">
        <li className="stamp-item relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[white] p-[20px] lg:p-[25px]">
          <Image src={stampImg} alt={region} width={300} height={300} />
        </li>
      </Link>
    </>
  );
};

export default StampItem;
