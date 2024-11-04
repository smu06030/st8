'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ImgModal from '@/components/photoalbum/ImgModal';
import { useAlbumList } from '@/hooks/useAlbumList';
import useImgModal from '@/hooks/useImgModal';
import AlbumImgEdit from '@/components/photoalbum/AlbumImgEdit';
import useAlbumDelete from '@/hooks/useAlbumDelete';
//{ params }: { params: { region: string } }

const RegionDetail = () => {
  const { region } = useParams<{ region: string }>();
  const regionTitle = decodeURIComponent(region);
  const { data: albumListData } = useAlbumList(); //TODO: 서버로할거면 서버액션으로 패치만들기
  const { selectedImgUrl, imgModal, onClickImgModal, setImgModal, activeImgId, setActiveImgId } = useImgModal();
  const { edit, setEdit, deleteId, onHandleDelete, handleCheckboxChange } = useAlbumDelete();

  const regionPhoto = albumListData?.filter((item) => item.region === regionTitle) || [];

  return (
    <div>
      <h2 className="mx-[24px] mt-[38px] border-b border-[#9C9C9C] py-[14px] font-semiBold text-[24px] text-[#004157]">
        {regionTitle}
      </h2>
      <ul className="mx-[24px] flex justify-end">
        <button
          className={`text-${edit ? 'red-500' : 'black'} px-[12px] py-[18px]`}
          onClick={() => setEdit((prev) => !prev)}
        >
          편집
        </button>
      </ul>
      <ul className="mt-[16px] grid grid-cols-3 gap-[6px]">
        {regionPhoto?.map((item) => (
          <li
            key={item.id}
            className={`${deleteId.includes(item.id) && 'border-red-500'} relative aspect-square overflow-hidden border`}
          >
            {item.photoImg && (
              <>
                <Image
                  onClick={() => onClickImgModal(item.photoImg, item.id)}
                  src={item.photoImg}
                  alt=""
                  width={200}
                  height={200}
                  priority
                  className="h-full w-full object-cover"
                />
                {edit && (
                  <input
                    type="checkbox"
                    className="absolute right-[10px] top-[10px] h-6 w-6 appearance-none rounded-full border border-gray-300 text-red-500 checked:border-red-500 checked:bg-[red]"
                    checked={deleteId.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {imgModal && (
        <ImgModal
          setImgModal={setImgModal}
          selectedImgUrl={selectedImgUrl}
          regionPhoto={regionPhoto}
          activeImgId={activeImgId}
          //   setActiveImgId={setActiveImgId}
        />
      )}
      {edit && <AlbumImgEdit deleteId={deleteId} onHandleDelete={onHandleDelete} />}
    </div>
  );
};

export default RegionDetail;
