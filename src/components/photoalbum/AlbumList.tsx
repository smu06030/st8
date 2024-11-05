'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ImgModal from '@/components/photoalbum/ImgModal';
import AddPhotoBtn from '@/components/photoalbum/AddPhotoBtn';
import Toptitle from '@/components/photoalbum/TopTitle';
import AlbumImgEdit from '@/components/photoalbum/AlbumImgEdit';

import { useAlbumList, useAlbumAddMutation, useAlbumDeleteMutation } from '@/hooks/useAlbumList';
import useAlbumDelete from '@/hooks/useAlbumDelete';
import useImgModal from '@/hooks/useImgModal';
import Loading from '@/app/(root)/(stamp)/loading';

const AlbumList = () => {
  const { data: albumListData, isPending, isError } = useAlbumList();
  const AlbumAddMutation = useAlbumAddMutation();

  const {
    selectedImgUrl,
    imgModal,
    onClickImgModal,
    setImgModal,
    activeImgId,
    setActiveImgId,
    currentIndex,
    setCurrentIndex
  } = useImgModal();
  const { edit, setEdit, deleteId, setDeleteId, handleCheckboxChange, onHandleDelete } = useAlbumDelete();

  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('allTab');

  //이미지팝업에 전달할 앨범전체이미지
  const regionPhoto = albumListData;

  useEffect(() => {
    if (regionPhoto) {
      const index = regionPhoto.findIndex((photo) => photo.id === activeImgId); //클릭한 이미지의 인덱스
      setCurrentIndex(index);
    }
  }, [activeImgId, regionPhoto, setCurrentIndex]);

  //편집안할땐 체크 다 풀기
  useEffect(() => {
    if (!edit) setDeleteId([]);
  }, [edit, setDeleteId]);

  //탭 액션
  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  if (isPending)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error loading data</div>;

  //유저가 등록한 지역이름들(중복_지역이름제거)
  const filterRigionTitle = albumListData ? [...new Set(albumListData?.map((item) => item.region))] : [];
  //유저가 등록한 지역의 포토들
  const filterRigionPhoto = filterRigionTitle.map(
    (title) => albumListData?.filter((item) => item.region === title) || []
  );

  return (
    <div>
      <Toptitle
        activeTab={activeTab}
        edit={edit}
        onClickTab={onClickTab}
        setEdit={setEdit}
        onHandleDelete={onHandleDelete}
      />
      {/* 전체보기 */}
      {activeTab === 'allTab' ? (
        <ul className="mt-[16px] grid grid-cols-3 gap-[6px]">
          <AddPhotoBtn
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            AlbumAddMutation={AlbumAddMutation}
            activeTab={activeTab}
            item=""
          />
          {albumListData?.map((item, index) => (
            <li
              onClick={() => onClickImgModal(item.photoImg, item.id, index)}
              key={item.id}
              className={`${edit && deleteId.includes(item.id) && 'border-2 border-[#D22730]'} relative aspect-square overflow-hidden border`}
            >
              {item.photoImg && (
                <>
                  <Image
                    // onClick={() => onClickImgModal(item.photoImg, item.id)}
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
                      checked={deleteId.includes(item.id)} //배열에 들은 아이디가 있어? 트루펄스
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <section className="mx-[24px] my-[18px] flex flex-col">
          <div className="flex flex-col gap-[34px]">
            {filterRigionTitle.map((item, index) => (
              <div key={item}>
                <div className="flex items-center border-b border-[#9C9C9C]">
                  <h2 className="py-[14px] font-bold text-[24px]">{item}</h2>
                </div>
                <ul className="relative mt-[16px] grid grid-cols-2 gap-[6px] pr-[20%]">
                  <AddPhotoBtn
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    AlbumAddMutation={AlbumAddMutation}
                    activeTab={activeTab}
                    item={item}
                  />
                  <Link href={`/photo-album/${item}`}>
                    <li
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${filterRigionPhoto[index]?.[0]?.photoImg})`
                      }}
                    ></li>
                  </Link>
                  <span className="absolute bottom-[-26px] right-0 pr-[20%] text-[14px] text-[#4F4F4F]">
                    {filterRigionPhoto[index]?.length}장
                  </span>
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      {imgModal && (
        <ImgModal
          setImgModal={setImgModal}
          selectedImgUrl={selectedImgUrl}
          regionPhoto={regionPhoto}
          activeImgId={activeImgId}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          // setActiveImgId={setActiveImgId}
        />
      )}
      {edit && <AlbumImgEdit deleteId={deleteId} onHandleDelete={onHandleDelete} />}
    </div>
  );
};

export default AlbumList;
