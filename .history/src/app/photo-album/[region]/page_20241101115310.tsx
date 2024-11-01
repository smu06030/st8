'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAlbumList, useAlbumAddMutation, useAlbumDeleteMutation } from '@/hooks/useAlbumList';

const RegionDetail = () => {
  const { region } = useParams<{ region: string }>();
  const regionTitle = decodeURIComponent(region);
  const { data: albumListData, isPending, isError } = useAlbumList();
  console.log('region', regionTitle);
  const rigionPhoto = albumListData?.filter((item) => item.region === regionTitle) || [];
  return (
    <div>
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
    </div>
  );
};

export default RegionDetail;
