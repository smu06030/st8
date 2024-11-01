'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAlbumList, useAlbumAddMutation, useAlbumDeleteMutation } from '@/hooks/useAlbumList';

const RegionDetail = ({ params }: { params: { region: string } }) => {
    console.log('params', params)
  const { region } = useParams<{ region: string }>();
  const regionTitle = decodeURIComponent(region);
  const { data: albumListData, isPending, isError } = useAlbumList();
  console.log('region', regionTitle);
  const rigionPhoto = albumListData?.filter((item) => item.region === regionTitle) || [];
  return (
    <div>
      <h2 className="mx-[24px] mt-[38px] border-b border-[#9C9C9C] py-[14px] font-black text-[24px] text-[#004157]">
        {regionTitle}
      </h2>
      <ul className="mt-[16px] grid grid-cols-3 gap-[6px]">
        {rigionPhoto?.map((item) => (
          <li
            key={item.id}
            //   className={`${deleteId.includes(item.id) && 'border-red-500'} relative aspect-square overflow-hidden border`}
          >
            {item.photoImg && (
              <>
                <Image
                  // onClick={() => onClickImgModal(item.photoImg)}
                  src={item.photoImg}
                  alt=""
                  width={200}
                  height={200}
                  priority
                  className="h-full w-full object-cover"
                />
                {/* {edit && (
                            <input
                              type="checkbox"
                              className="absolute right-[10px] top-[10px] h-6 w-6 appearance-none rounded-full border border-gray-300 text-red-500 checked:border-red-500 checked:bg-[red]"
                              checked={deleteId.includes(item.id)} //배열에 들은 아이디가 있어?
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                          )} */}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionDetail;
