'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Loading from '@/app/(root)/(stamp)/loading';
import ImgModal from '@/components/photoalbum/ImgModal';
import useImgModal from '@/hooks/useImgModal';
import AlbumImgEdit from '@/components/photoalbum/EditAlbumImg';
import useAlbumDelete from '@/hooks/useAlbumDelete';
import useUserId from '@/hooks/useUserId';
import { useGetAlbumListQuery } from '@/queries/query/useAlbumQuery';

const RegionDetail = () => {
  const userId = useUserId();
  const { region } = useParams<{ region: string }>();
  const regionTitle = decodeURIComponent(region);
  const { data: albumListData, isLoading, isError } = useGetAlbumListQuery(userId);

  const { selectedImgUrl, imgModal, onClickImgModal, setImgModal, activeImgId, currentIndex, setCurrentIndex } =
    useImgModal();
  const { edit, setEdit, deleteId, onHandleDelete, handleCheckboxChange } = useAlbumDelete();

  const regionPhoto = albumListData?.filter((item) => item.region === regionTitle) || [];

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>데이터를 가져오지 못하였습니다.</div>;

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
      <ul className="mt-[32px] grid grid-cols-3 gap-[6px]">
        {regionPhoto?.map((item, index) => (
          <li
            onClick={() => {
              if (!edit) {
                onClickImgModal(item.photoImg, item.id, index);
              }
            }}
            key={item.id}
            className={`${deleteId.includes(item.id) && 'border-red-500'} relative aspect-square overflow-hidden border`}
          >
            {item.photoImg && (
              <>
                <Image
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
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      )}
      {edit && <AlbumImgEdit deleteId={deleteId} onHandleDelete={onHandleDelete} />}
    </div>
  );
};

export default RegionDetail;
